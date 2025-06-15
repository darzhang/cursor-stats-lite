# Cursor Stats Lite

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)

A lightweight VS Code extension that monitors your Cursor AI usage directly in the status bar. This is a simplified version based on [Cursor Stats](https://github.com/Dwtexe/cursor-stats) by Dwtexe, focusing on core functionality for users who prefer a minimal approach.

## 📋 Attribution

**This project is based on [Cursor Stats](https://github.com/Dwtexe/cursor-stats) by Dwtexe.**

- **Original Project:** Cursor Stats
- **Original Author:** Dwtexe
- **Original Repository:** https://github.com/Dwtexe/cursor-stats
- **Original License:** GNU General Public License v3.0
- **This Version:** Simplified derivative focusing on core features

## 🚀 Features

- **Real-time Usage Tracking**: Monitor your Cursor premium requests in the status bar
- **Auto-refresh**: Configurable refresh intervals (5-600 seconds)
- **Clean Interface**: Minimal, non-intrusive design that stays out of your way
- **Manual Refresh**: Click the status bar to refresh manually
- **Color-coded Status**: Visual indicators as you approach your limits
- **Usage Details**: Hover tooltip shows detailed usage information and refresh interval

## 📊 What You'll See

- **Status Bar**: `📊 150/500 $2.50` (graph icon, usage count, and cost if applicable)
- **Tooltip**: Simple breakdown showing:
  - Premium Requests: 150/500 (30%)
  - Refresh Interval: 30 seconds
- **Color Coding**:
  - Default: Normal usage (0-50%)
  - 🟡 Yellow (50-75%): Moderate usage
  - 🟠 Orange (75-90%): High usage
  - 🔴 Red (90%+): Approaching limit

## 🔄 Differences from Original Cursor Stats

This lite version removes advanced features to focus on simplicity:

### Removed Features

- Internationalization (multi-language support)
- Multi-currency support and conversion
- Progress bar visualizations
- Advanced notification system
- Team usage tracking
- Diagnostic reporting
- GitHub release checking
- Complex configuration options
- Spending alert thresholds
- Daily usage projections
- Weekend-aware calculations

### What's Kept

- ✅ Core usage monitoring
- ✅ Status bar integration
- ✅ Basic tooltips
- ✅ Manual refresh
- ✅ Auto-refresh with configurable intervals
- ✅ Color-coded status indicators

_For the full-featured version with advanced capabilities, use the [original Cursor Stats](https://github.com/Dwtexe/cursor-stats)._

## 📦 Installation

### Option 1: Install from Release

1. Download the latest `cursor-stats-lite.vsix` from releases
2. Open Cursor/VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Extensions: Install from VSIX"
5. Select the downloaded `.vsix` file

### Option 2: Install from Source

```bash
# Clone the repository
git clone https://github.com/darzhang/cursor-stats-lite.git
cd cursor-stats-lite

# Install dependencies and build
npm install
npm run build

# Install the extension
npm run install-local
```

## ⚙️ Configuration

Configure the extension through VS Code settings:

```json
{
  "cursorStatsLite.refreshInterval": 30
}
```

- **refreshInterval**: Auto-refresh interval in seconds (5-600, default: 30)

### How to Configure

- Go to `Settings > Extensions > Cursor Stats Lite`
- Or edit your `settings.json` directly

## 🔧 Usage

1. **Install and Activate**: The extension activates automatically when Cursor starts
2. **View Usage**: Check the status bar on the bottom right
3. **Hover for Details**: Hover over the status bar item for detailed information
4. **Manual Refresh**: Click the status bar item to refresh immediately
5. **Adjust Refresh**: Change refresh interval in extension settings

## 🛠️ Development

### Prerequisites

- Node.js (v14 or higher)
- npm
- VS Code or Cursor

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/darzhang/cursor-stats-lite.git
cd cursor-stats-lite

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes during development
npm run watch
```

### Build and Test

```bash
# Clean previous builds
npm run clean

# Build everything
npm run build

# Install locally for testing
npm run install-local

# Development workflow (build + install)
npm run dev-install
```

### Project Structure

```
cursor-stats-lite/
├── src/
│   ├── extension.ts      # Main extension entry point
│   ├── statusBar.ts      # Status bar UI management
│   ├── api.ts           # Cursor API integration
│   ├── database.ts      # Token storage and retrieval
│   └── types.ts         # TypeScript type definitions
├── out/                 # Compiled JavaScript output
├── package.json         # Extension manifest and scripts
├── tsconfig.json        # TypeScript configuration
├── LICENSE.md           # GPL 3.0 License
└── ATTRIBUTION.md       # Attribution to original work
```

### Key Components

#### `extension.ts`

- Extension activation and lifecycle management
- Auto-refresh setup and configuration handling
- Single refresh command registration

#### `statusBar.ts`

- Status bar UI creation and updates
- Simple tooltip generation with usage and refresh interval
- Color coding based on usage percentage

#### `api.ts`

- Cursor API communication
- Usage data fetching and parsing
- Error handling for API calls

#### `database.ts`

- Cursor authentication token retrieval from local database
- Cross-platform database path handling

## 🔌 Available Commands

The extension currently provides one command:

- **Refresh Cursor Usage** (`cursor-usage.refresh`): Manually refresh usage data

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes and test thoroughly
4. **Commit** your changes: `git commit -m 'Add amazing feature'`
5. **Push** to the branch: `git push origin feature/amazing-feature`
6. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Test your changes thoroughly
- Update documentation as needed
- Ensure compatibility with both VS Code and Cursor
- Keep the UI minimal and non-intrusive
- Respect the GPL 3.0 license requirements

## 📝 Scripts Reference

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run compile`       | Compile TypeScript to JavaScript         |
| `npm run watch`         | Watch for changes and auto-compile       |
| `npm run clean`         | Remove build artifacts                   |
| `npm run package`       | Create .vsix package                     |
| `npm run build`         | Clean, compile, and package              |
| `npm run install-local` | Install extension locally                |
| `npm run dev-install`   | Build and install (development workflow) |

## 🐛 Troubleshooting

### Common Issues

**Extension not showing in status bar:**

- Ensure you're signed in to Cursor
- Check if the extension is activated in the Extensions panel
- Try reloading the window (`Ctrl+Shift+P` → "Developer: Reload Window")

**"No Cursor token found" error:**

- Sign in to your Cursor account
- Restart Cursor after signing in
- Check your internet connection

**High refresh rates causing performance issues:**

- Increase refresh interval in settings
- Recommended: 30-60 seconds for optimal performance

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

**This is a derivative work of [Cursor Stats](https://github.com/Dwtexe/cursor-stats) by Dwtexe, also licensed under GPL 3.0.**

### License Compliance

This derivative work complies with GPL 3.0 requirements by:

- Using the same GPL 3.0 license as the original
- Providing full source code
- Clearly attributing the original work
- Documenting changes made from the original

## 🙏 Acknowledgments

- **Primary acknowledgment to [Dwtexe](https://github.com/Dwtexe)** for creating the original [Cursor Stats](https://github.com/Dwtexe/cursor-stats) extension
- Built for the Cursor community
- Inspired by the need for simple, effective usage monitoring
- Thanks to all contributors and users

## 📧 Contact

- **Author**: Darren Zhang
- **Repository**: [https://github.com/darzhang/cursor-stats-lite](https://github.com/darzhang/cursor-stats-lite)
- **Issues**: [GitHub Issues](https://github.com/darzhang/cursor-stats-lite/issues)
- **Original Work**: [Cursor Stats by Dwtexe](https://github.com/Dwtexe/cursor-stats)

---

_Simplified version of Cursor Stats, made with ❤️ for the Cursor community_
