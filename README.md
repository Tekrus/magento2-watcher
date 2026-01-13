# ddev-grunt-browsersync

DDEV addon for Magento 2 development with Grunt and BrowserSync live reload.

## Features

- BrowserSync for automatic browser reloading on file changes
- Grunt watch for LESS/CSS compilation
- **Interactive theme selection** - auto-detects themes from Magento database
- Automatic npm package management during initialization
- Live reload integration with Magento 2

## Installation

```bash
ddev get Tekrus/magento2-watcher
ddev restart
```

## Quick Start

```bash
# 1. Initialize themes and install npm packages (interactive)
ddev grunt init

# 2. Start BrowserSync + Grunt watch
ddev grunt watch
```

## Interactive Theme Setup

Run `ddev grunt init` to:

1. Query Magento database for installed themes
2. Display interactive selection menu (use space to select, enter to confirm)
3. Enter locale for each selected theme
4. Generate `.ddev/grunt/grunt-local-themes.js` automatically
5. Install required npm packages (grunt, browser-sync, etc.)

```bash
$ ddev grunt init
Found 3 themes in your database.

Select themes to add (use space to select):
[✓] Vendor/theme-default
[ ] Vendor/theme-custom
[ ] Hyva/theme-alpine

Locale for Vendor/theme-default: en_US

Generating .ddev/grunt/grunt-local-themes.js...

✓ Added 1 theme(s) to .ddev/grunt/grunt-local-themes.js

Installing npm packages...
✓ npm packages installed successfully
✓ Run: ddev grunt watch
```

## Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `ddev grunt init` | `install`, `i` | Interactive theme setup (select from DB) and install npm packages |
| `ddev grunt themes` | `theme` | List configured themes |
| `ddev grunt watch` | - | Start BrowserSync + Grunt watch |
| `ddev grunt help` | `-h`, `--help` | Show help message |

## Magento Base URLs

**Important:** The unsecure base URL must be HTTP:

```bash
ddev exec php bin/magento config:set web/unsecure/base_url "http://${DDEV_HOSTNAME}/"
ddev exec php bin/magento config:set web/secure/base_url "https://${DDEV_HOSTNAME}/"
```

## Troubleshooting

**No themes found:**
- Ensure Magento is installed: `ddev exec php bin/magento setup:install`
- Clear Magento cache: `ddev exec php bin/magento cache:flush`

**Missing npm packages or errors during watch:**
- Re-run initialization: `ddev grunt init`
- This will check and install any missing packages

**BrowserSync not connecting:**
- Verify base URLs are HTTP (unsecure) / HTTPS (secure)
- Check port 3000 exposure: `ddev config | grep browsersync`
- Restart DDEV: `ddev restart`

**CSS changes not appearing:**
- Run: `ddev exec php bin/magento setup:static-content:deploy -f`
- Clear cache: `ddev exec php bin/magento cache:flush`
- Check Grunt output for compilation errors
- Make sure merge and minify CSS is disabled

## How It Works

1. **First-time setup**: Run `ddev grunt init` to configure themes and install npm packages
2. **Development**: Run `ddev grunt watch` to start BrowserSync and Grunt watch
3. **Live reload**: Edit LESS/CSS files and see changes instantly in the browser

npm packages are installed only once during initialization for optimal performance. The `watch` command starts immediately without any package checks.

## Configuration Files

After running `ddev grunt init`, the following files are created:

- `.ddev/grunt/grunt-local-themes.js` - Theme configuration
- `package.json` - npm dependencies (if not existing)
- `node_modules/` - Installed npm packages

## Uninstallation

```bash
ddev addon remove magento2-watcher
ddev restart

# Optionally remove generated files:
rm -rf .ddev/grunt/grunt-local-themes.js
rm -rf package.json node_modules/
```
