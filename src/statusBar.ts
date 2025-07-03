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

import * as vscode from "vscode";
import { UsageData } from "./types";

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this.statusBarItem.command = "cursor-usage.refresh";
  }

  public updateDisplay(data: UsageData) {
    const { premiumRequests, usageBasedPricing } = data;

    // Determine plan type
    const isLegacyPlan = premiumRequests.limit !== null && premiumRequests.limit !== undefined;
    
    // Build status text based on plan type
    let statusText: string;
    let premiumPercent: number;
    
    if (isLegacyPlan) {
      // Legacy plan: show current/limit (Legacy)
      premiumPercent = Math.round((premiumRequests.current / premiumRequests.limit) * 100);
      statusText = `$(graph) ${premiumRequests.current}/${premiumRequests.limit} (Legacy)`;
    } else {
      // New plan: show current only (Rate Limit)
      premiumPercent = 0; // No percentage for unlimited plans
      statusText = `$(graph) ${premiumRequests.current} (Rate Limit)`;
    }

    // Add usage-based cost if enabled
    if (usageBasedPricing.isEnabled && usageBasedPricing.totalCost > 0) {
      statusText += ` $(credit-card) $${usageBasedPricing.totalCost.toFixed(2)}`;
    }

    this.statusBarItem.text = statusText;

    // Set color based on usage (only for legacy plans with limits)
    if (isLegacyPlan) {
      if (premiumPercent >= 90) {
        this.statusBarItem.color = "#FF3333";
      } else if (premiumPercent >= 75) {
        this.statusBarItem.color = "#FF8800";
      } else if (premiumPercent >= 50) {
        this.statusBarItem.color = "#FFCC00";
      } else {
        this.statusBarItem.color = undefined;
      }
    } else {
      // New plan users don't have usage limits, so no color indication needed
      this.statusBarItem.color = undefined;
    }

    // Create tooltip
    const tooltip = this.createTooltip(data);
    this.statusBarItem.tooltip = tooltip;

    this.statusBarItem.show();
  }

  private createTooltip(data: UsageData): vscode.MarkdownString {
    const { premiumRequests, usageBasedPricing } = data;
    const tooltip = new vscode.MarkdownString();

    // Get current refresh interval from configuration
    const config = vscode.workspace.getConfiguration("cursorStatsLite");
    const refreshInterval = config.get<number>("refreshInterval", 30);

    // Determine plan type
    const isLegacyPlan = premiumRequests.limit !== null && premiumRequests.limit !== undefined;

    tooltip.appendMarkdown("## Cursor Usage\n\n");

    // Plan type section
    const planType = isLegacyPlan ? "Request Limit (Legacy)" : "New Plan (Rate Limit)";
    tooltip.appendMarkdown(`**Plan Type:** ${planType}\n\n`);

    // Premium requests section - different display based on plan type
    if (isLegacyPlan) {
      const premiumPercent = Math.round((premiumRequests.current / premiumRequests.limit) * 100);
      tooltip.appendMarkdown(
        `**Premium Requests:** ${premiumRequests.current}/${premiumRequests.limit} (${premiumPercent}%)\n\n`
      );
    } else {
      tooltip.appendMarkdown(
        `**Premium Requests:** ${premiumRequests.current} (unlimited)\n\n`
      );
    }

    // Usage-based pricing section
    tooltip.appendMarkdown(
      `**Usage-Based Pricing:** ${usageBasedPricing.isEnabled ? 'Enabled' : 'Disabled'}\n\n`
    );

    // Refresh interval information
    tooltip.appendMarkdown(
      `**Refresh Interval:** ${refreshInterval} seconds\n\n`
    );

    return tooltip;
  }

  public showError(message: string) {
    this.statusBarItem.text = `$(alert) Error`;
    this.statusBarItem.tooltip = message;
    this.statusBarItem.color = "#FF0000";
    this.statusBarItem.show();
  }

  public dispose() {
    this.statusBarItem.dispose();
  }
}
