# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5]

### Fixed

- Fixed active subscription detection to properly check subscription status from teams result
- Enhanced team membership logic to find active subscriptions instead of just checking team presence

## [1.0.4]

### Fixed

- Fixed inconsistent usage-based pricing status detection for team members
- Backend correctly detected team usage-based pricing as enabled but UI tooltip incorrectly showed "disabled" due to missing team context
- Resolved issue where $250 usage-based pricing showed as "disabled" in tooltip despite being active

### Added

- Team-aware API integration with automatic team membership detection
- Plan type differentiation in UI between legacy (request limit) and new (rate limit) plans
- Enhanced tooltip with plan type information for better user experience
- `checkTeamMembership()` function to detect team membership
- Team context support in `getCurrentUsageLimit()` function

### Changed

- Status bar now shows plan type: "Legacy" for limited plans, "Rate Limit" for unlimited plans
- Legacy plan users see `$(graph) 15/500 (Legacy)` with color-coded usage warnings
- New plan users see `$(graph) 15 (Rate Limit)` with no limit restrictions
- Tooltip displays appropriate plan type: "Request Limit (Legacy)" vs "New Plan (Rate Limit)"
- Different premium request display based on plan type (with/without limits)
- Updated API endpoints to use `https://cursor.com` instead of `https://www.cursor.com`

### Removed

- All debug logging (`console.log` statements) for production-ready code
- Verbose error logging while maintaining essential error handling

## [1.0.0]

### Added

- Initial release of Cursor Stats Lite
- Basic usage monitoring for Cursor premium requests
- Status bar display with current usage and limits
- Auto-refresh functionality with configurable intervals
- Usage-based pricing cost tracking
- Tooltip with detailed usage information
- Support for individual user accounts
- Configuration settings for refresh intervals
