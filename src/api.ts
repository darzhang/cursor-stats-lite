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

export async function getCurrentUsageLimit(
  token: string
): Promise<UsageLimitResponse> {
  const response = await axios.post(
    "https://www.cursor.com/api/dashboard/get-hard-limit",
    {},
    { headers: { Cookie: `WorkosCursorSessionToken=${token}` } }
  );
  return response.data;
}

export async function fetchUsageData(token: string): Promise<UsageData> {
  const userId = token.split("%3A%3A")[0];

  // Get premium requests usage
  const premiumResponse = await axios.get("https://www.cursor.com/api/usage", {
    params: { user: userId },
    headers: { Cookie: `WorkosCursorSessionToken=${token}` },
  });

  const premiumRequests = {
    current: premiumResponse.data["gpt-4"].numRequests,
    limit: premiumResponse.data["gpt-4"].maxRequestUsage,
  };

  // Get usage-based pricing info
  const limitResponse = await getCurrentUsageLimit(token);
  const isUsageBasedEnabled = !limitResponse.noUsageBasedAllowed;

  let totalCost = 0;
  if (isUsageBasedEnabled) {
    // Get current month billing data
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    try {
      const billingResponse = await axios.post(
        "https://www.cursor.com/api/dashboard/get-monthly-invoice",
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
      console.error("Error fetching billing data:", error);
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
}
