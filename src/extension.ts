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
import { StatusBarManager } from "./statusBar";
import { getCursorToken, setExtensionContext } from "./database";
import { fetchUsageData } from "./api";

let statusBarManager: StatusBarManager;

let refreshIntervalId: NodeJS.Timeout | undefined;

export async function activate(context: vscode.ExtensionContext) {
  setExtensionContext(context);

  // Initialize status bar
  statusBarManager = new StatusBarManager();

  // Register refresh command
  const refreshCommand = vscode.commands.registerCommand(
    "cursor-usage.refresh",
    refreshUsage
  );

  context.subscriptions.push(statusBarManager, refreshCommand);

  // Initial load
  await refreshUsage();

  // Set up auto-refresh with configurable interval
  setupAutoRefresh();

  // Listen for configuration changes
  const configChangeListener = vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration("cursorStatsLite.refreshInterval")) {
        setupAutoRefresh();
      }
    }
  );

  context.subscriptions.push(
    { dispose: () => clearInterval(refreshIntervalId) },
    configChangeListener
  );
}

function setupAutoRefresh() {
  // Clear existing interval
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }

  // Get refresh interval from settings (default: 30 seconds)
  const config = vscode.workspace.getConfiguration("cursorStatsLite");
  const refreshIntervalSeconds = config.get<number>("refreshInterval", 30);

  // Set up new interval
  refreshIntervalId = setInterval(refreshUsage, refreshIntervalSeconds * 1000);
}

async function refreshUsage() {
  try {
    const token = await getCursorToken();

    if (!token) {
      statusBarManager.showError(
        "No Cursor token found. Please sign in to Cursor."
      );
      return;
    }

    const usageData = await fetchUsageData(token);
    statusBarManager.updateDisplay(usageData);
  } catch (error) {
    console.error("Error refreshing usage:", error);
    statusBarManager.showError("Failed to fetch usage data");
  }
}

export function deactivate() {
  if (statusBarManager) {
    statusBarManager.dispose();
  }
}
