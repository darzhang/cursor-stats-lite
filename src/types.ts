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

export interface UsageData {
  premiumRequests: {
    current: number;
    limit: number;
  };
  usageBasedPricing: {
    totalCost: number;
    limit?: number;
    isEnabled: boolean;
  };
}

export interface UsageItem {
  totalDollars: string;
  description: string;
}

export interface UsageLimitResponse {
  hardLimit?: number;
  noUsageBasedAllowed?: boolean;
}
