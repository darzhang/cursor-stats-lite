/*
 * Cursor Stats Lite
 * Copyright (C) 2024 Darren Zhang
 * Based on Cursor Stats Copyright (C) 2024 Dwtexe
 * Original work: https://github.com/Dwtexe/cursor-stats
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import axios from "axios";
import { UsageData, UsageItem, UsageLimitResponse } from "./types";

export async function checkTeamMembership(
  token: string
): Promise<{ isTeamMember: boolean; teamId?: number }> {
  try {
    const response = await axios.post(
      "https://cursor.com/api/dashboard/teams",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `WorkosCursorSessionToken=${token}`,
        },
      }
    );

    const isTeamMember = response.data?.teams?.length > 0;

    // Find active subscription from list of teams
    const activeSubscription = response.data.teams.find(
      (team: any) => team.subscriptionStatus === "active"
    );
    const teamId = isTeamMember ? activeSubscription?.id : undefined;

    return {
      isTeamMember,
      teamId,
    };
  } catch (error) {
    return { isTeamMember: false };
  }
}

export async function getCurrentUsageLimit(
  token: string,
  teamId?: number
): Promise<UsageLimitResponse> {
  const payload = teamId ? { teamId } : {};
  try {
    const response = await axios.post(
      "https://cursor.com/api/dashboard/get-hard-limit",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `WorkosCursorSessionToken=${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUsageData(token: string): Promise<UsageData> {
  const userId = token.split("%3A%3A")[0];

  // Check team membership first
  const teamInfo = await checkTeamMembership(token);

  // Get premium requests usage
  try {
    const premiumResponse = await axios.get("https://cursor.com/api/usage", {
      params: { user: userId },
      headers: { Cookie: `WorkosCursorSessionToken=${token}` },
    });

    const premiumRequests = {
      current: premiumResponse.data["gpt-4"].numRequests,
      limit: premiumResponse.data["gpt-4"].maxRequestUsage,
      startOfMonth: premiumResponse.data.startOfMonth,
    };

    // Get usage-based pricing info with team context
    const limitResponse = await getCurrentUsageLimit(token, teamInfo.teamId);
    const isUsageBasedEnabled = !limitResponse.noUsageBasedAllowed;

    let totalCost = 0;
    if (isUsageBasedEnabled) {
      // Get current month billing data
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      try {
        const billingResponse = await axios.post(
          "https://cursor.com/api/dashboard/get-monthly-invoice",
          {
            month,
            year,
            includeUsageEvents: false,
          },
          {
            headers: { Cookie: `WorkosCursorSessionToken=${token}` },
          }
        );

        if (billingResponse.data.items) {
          totalCost = billingResponse.data.items.reduce(
            (sum: number, item: UsageItem) => {
              if (
                item.totalDollars &&
                !item.description.includes("Mid-month usage paid")
              ) {
                const cost = parseFloat(item.totalDollars.replace("$", ""));
                return cost > 0 ? sum + cost : sum;
              }
              return sum;
            },
            0
          );
        }
      } catch (error) {
        // Failed to fetch billing data, totalCost remains 0
      }
    }

    return {
      premiumRequests,
      usageBasedPricing: {
        totalCost,
        limit: limitResponse.hardLimit,
        isEnabled: isUsageBasedEnabled,
      },
    };
  } catch (error) {
    throw error;
  }
}
