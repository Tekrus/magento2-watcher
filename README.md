[![add-on registry](https://img.shields.io/badge/DDEV-Add--on_Registry-blue)](https://addons.ddev.com)
[![tests](https://github.com/Tekrus/magento2-watcher/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/Tekrus/magento2-watcher/actions/workflows/tests.yml?query=branch%3Amain)
[![last commit](https://img.shields.io/github/last-commit/Tekrus/magento2-watcher)](https://github.com/Tekrus/magento2-watcher/commits)
[![release](https://img.shields.io/github/v/release/Tekrus/magento2-watcher)](https://github.com/Tekrus/magento2-watcher/releases/latest)

# DDEV Magento2 Watcher

## Overview

This add-on integrates Magento2 Watcher into your [DDEV](https://ddev.com/) project.

## Installation

```bash
ddev add-on get Tekrus/magento2-watcher
ddev restart
```

After installation, make sure to commit the `.ddev` directory to version control.

## Usage

| Command | Description |
| ------- | ----------- |
| `ddev describe` | View service status and used ports for Magento2 Watcher |
| `ddev logs -s magento2-watcher` | Check Magento2 Watcher logs |

## Advanced Customization

To change the Docker image:

```bash
ddev dotenv set .ddev/.env.magento2-watcher --magento2-watcher-docker-image="ddev/ddev-utilities:latest"
ddev add-on get Tekrus/magento2-watcher
ddev restart
```

Make sure to commit the `.ddev/.env.magento2-watcher` file to version control.

All customization options (use with caution):

| Variable | Flag | Default |
| -------- | ---- | ------- |
| `MAGENTO2_WATCHER_DOCKER_IMAGE` | `--magento2-watcher-docker-image` | `ddev/ddev-utilities:latest` |

## Credits

**Contributed and maintained by [@Tekrus](https://github.com/Tekrus)**
