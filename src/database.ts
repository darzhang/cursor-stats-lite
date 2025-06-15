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

import * as path from "path";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import * as vscode from "vscode";
import initSqlJs from "sql.js";

function getDefaultUserDirPath(): string {
  const context = getExtensionContext();
  const extensionGlobalStoragePath = context.globalStorageUri.fsPath;
  return path.dirname(path.dirname(path.dirname(extensionGlobalStoragePath)));
}

export function getCursorDBPath(): string {
  const userDirPath = getDefaultUserDirPath();
  const folderName = vscode.env.appName;

  if (process.platform === "win32") {
    return path.join(userDirPath, "User", "globalStorage", "state.vscdb");
  } else if (process.platform === "darwin") {
    return path.join(userDirPath, "User", "globalStorage", "state.vscdb");
  } else {
    return path.join(userDirPath, "User", "globalStorage", "state.vscdb");
  }
}

export async function getCursorToken(): Promise<string | null> {
  try {
    const dbPath = getCursorDBPath();

    if (!fs.existsSync(dbPath)) {
      console.error("Database file not found");
      return null;
    }

    const dbBuffer = fs.readFileSync(dbPath);
    const SQL = await initSqlJs();
    const db = new SQL.Database(new Uint8Array(dbBuffer));

    const result = db.exec(
      "SELECT value FROM ItemTable WHERE key = 'cursorAuth/accessToken'"
    );

    if (!result.length || !result[0].values.length) {
      db.close();
      return null;
    }

    const token = result[0].values[0][0] as string;
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded?.payload?.sub) {
      db.close();
      return null;
    }

    const sub = decoded.payload.sub.toString();
    const userId = sub.split("|")[1];
    const sessionToken = `${userId}%3A%3A${token}`;

    db.close();
    return sessionToken;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

// This needs to be set by the main extension
let extensionContext: vscode.ExtensionContext;
export function setExtensionContext(context: vscode.ExtensionContext) {
  extensionContext = context;
}
export function getExtensionContext() {
  return extensionContext;
}
