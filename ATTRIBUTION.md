# Attribution

## Original Work

This project is a derivative work of:

**Original Project:** Cursor Stats  
**Original Author:** Dwtexe  
**Original Repository:** https://github.com/Dwtexe/cursor-stats  
**Original License:** GNU General Public License v3.0  
**Original Copyright:** Copyright (C) 2025 Dwtexe

## Derivative Work

**Project:** Cursor Stats Lite  
**Author:** Darren Zhang  
**Repository:** https://github.com/darzhang/cursor-stats-lite  
**License:** GNU General Public License v3.0 (same as original)  
**Copyright:** Copyright (C) 2025 Darren Zhang

## Changes Made in This Derivative Work

This simplified version removes several features from the original while maintaining core functionality:

### Removed Features

1. **Internationalization (i18n) Support** - Removed multi-language support (English, Chinese, Korean, Japanese)
2. **Multi-currency Support** - Removed currency conversion and display options
3. **Progress Bar Visualizations** - Removed emoji-based progress bars for usage tracking
4. **Advanced Notification System** - Simplified notification logic, removed threshold customization
5. **Team Usage Tracking** - Removed team membership and usage analytics
6. **Diagnostic Reporting** - Removed comprehensive diagnostic report generation
7. **GitHub Release Checking** - Removed automatic update checking and changelog display
8. **Advanced Configuration Options** - Simplified settings to focus on core functionality
9. **Cooldown System** - Removed API rate limiting and cooldown mechanisms
10. **Status Bar Color Customization** - Simplified color theming
11. **Spending Alerts** - Removed configurable spending threshold notifications
12. **Daily Remaining Calculations** - Removed daily usage projections
13. **Weekend Exclusion Logic** - Removed weekend-aware calculations
14. **Custom Database Path Support** - Simplified to default paths only

### Retained Core Features

1. **Real-time Usage Monitoring** - Basic Cursor usage tracking
2. **Status Bar Integration** - Display usage in VS Code status bar
3. **Authentication Token Management** - Secure token retrieval from Cursor database
4. **Premium Request Tracking** - Monitor fast request usage and limits
5. **Usage-based Pricing Display** - Show current spending for usage-based billing
6. **Manual Refresh** - Click to refresh usage data
7. **Basic Tooltips** - Simple hover information
8. **Auto-refresh** - Configurable refresh intervals

### Code Changes

- Simplified file structure while maintaining same organization
- Removed complex internationalization infrastructure
- Streamlined API calls to focus on essential data only
- Simplified UI components and removed advanced styling
- Reduced dependency count
- Removed complex state management for features not needed

## License Compliance

This derivative work is distributed under the GNU General Public License v3.0, the same license as the original work, in compliance with the GPL's copyleft requirements.

## Acknowledgments

Special thanks to Dwtexe for creating the original Cursor Stats extension that inspired and enabled this simplified version. The original work provided the foundation for understanding Cursor's API structure and authentication mechanisms.

---

For the full original source code and complete feature set, please visit: https://github.com/Dwtexe/cursor-stats
