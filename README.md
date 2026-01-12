# ddev-grunt-browsersync

Ddev addon for Magento 2 development with Grunt and BrowserSync live reload.

## Features

- BrowserSync for automatic browser reloading
- Grunt watch for LESS/CSS compilation
- **Interactive theme selection** - auto-detects themes from Magento database
- Livereload integration with Magento 2

## Installation

```bash
ddev get Tekrus/magento2-watcher
ddev restart
```

## Quick Start

```bash
# 1. Initialize themes (interactive selection from database)
ddev grunt init

# 2. Install npm dependencies
ddev exec npm install

# 3. Register themes with Grunt
ddev exec grunt themes

# 4. Start BrowserSync + Grunt watch
ddev browsersync
```

## Interactive Theme Setup

Run `ddev grunt init` to:

1. Query Magento database for installed themes
2. Display interactive selection menu (use space to select, enter to confirm)
3. Enter theme path for each selected theme
4. Enter locale for each selected theme
5. Generate `grunt-local-themes.js` automatically

```bash
$ ddev grunt init
Found 3 themes in your database.

Select themes to add (use space to select):
[✓] Vendor/theme-default
[ ] Vendor/theme-custom
[ ] Hyva/theme-alpine

Theme path (Vendor/theme-default): app/design/frontend/Vendor/theme-default
Locale for Vendor/theme-default: en_US
```

## Commands

| Command | Description |
|---------|-------------|
| `ddev grunt init` | Interactive theme setup (select from DB) |
| `ddev grunt themes` | List configured themes |
| `ddev browsersync` | Start BrowserSync + Grunt watch |

## Configuration Files

| File | Purpose |
|------|---------|
| `.ddev/config.browsersync.yaml` | Port exposure |
| `.ddev/browser-sync.cjs` | BrowserSync settings |
| `.ddev/commands/web/browsersync` | Ddev command |
| `.ddev/commands/web/grunt` | Theme management command |
| `.ddev/grunt-local-themes.js` | Auto-generated theme config |

## NPM Dependencies

Add to `package.json`:

```json
{
  "devDependencies": {
    "grunt": "~1.6.1",
    "grunt-browser-sync": "~2.2.0",
    "grunt-contrib-clean": "~2.0.1",
    "grunt-contrib-cssmin": "~5.0.0",
    "grunt-contrib-imagemin": "~4.0.0",
    "grunt-contrib-jasmine": "~4.0.0",
    "grunt-contrib-less": "~3.0.0",
    "grunt-contrib-watch": "~1.1.0",
    "grunt-eslint": "~24.3.0",
    "grunt-exec": "~3.0.0",
    "grunt-replace": "~2.0.2",
    "grunt-styledocco": "~0.3.0",
    "grunt-template-jasmine-requirejs": "~0.2.3",
    "grunt-text-replace": "~0.4.0",
    "load-grunt-config": "~4.0.1",
    "time-grunt": "~2.0.0",
    "underscore": "1.13.7"
  }
}
```

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

**BrowserSync not connecting:**
- Verify base URLs are HTTP (unsecure) / HTTPS (secure)
- Check port 3000 exposure: `ddev config | grep browsersync`

**CSS changes not appearing:**
- Run: `ddev exec php bin/magento setup:static-content:deploy -f`
- Clear cache: `ddev exec php bin/magento cache:flush`

## Uninstallation

```bash
ddev restart
# Remove created files manually:
# - .ddev/grunt-local-themes.js
# - .ddev/commands/web/grunt
# - .ddev/commands/web/components/
```
