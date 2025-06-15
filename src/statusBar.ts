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

    // Calculate premium usage percentage
    const premiumPercent = Math.round(
      (premiumRequests.current / premiumRequests.limit) * 100
    );

    // Build status text
    let statusText = `$(graph) ${premiumRequests.current}/${premiumRequests.limit}`;

    // Add usage-based cost if enabled
    if (usageBasedPricing.isEnabled && usageBasedPricing.totalCost > 0) {
      statusText += ` $(credit-card) $${usageBasedPricing.totalCost.toFixed(
        2
      )}`;
    }

    this.statusBarItem.text = statusText;

    // Set color based on usage
    if (premiumPercent >= 90) {
      this.statusBarItem.color = "#FF3333";
    } else if (premiumPercent >= 75) {
      this.statusBarItem.color = "#FF8800";
    } else if (premiumPercent >= 50) {
      this.statusBarItem.color = "#FFCC00";
    } else {
      this.statusBarItem.color = undefined;
    }

    // Create tooltip
    const tooltip = this.createTooltip(data);
    this.statusBarItem.tooltip = tooltip;

    this.statusBarItem.show();
  }

  private createTooltip(data: UsageData): vscode.MarkdownString {
    const { premiumRequests } = data;
    const tooltip = new vscode.MarkdownString();

    // Get current refresh interval from configuration
    const config = vscode.workspace.getConfiguration("cursorStatsLite");
    const refreshInterval = config.get<number>("refreshInterval", 30);

    tooltip.appendMarkdown("## Cursor Usage\n\n");

    // Premium requests section
    const premiumPercent = Math.round(
      (premiumRequests.current / premiumRequests.limit) * 100
    );
    tooltip.appendMarkdown(
      `**Premium Requests:** ${premiumRequests.current}/${premiumRequests.limit} (${premiumPercent}%)\n\n`
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
