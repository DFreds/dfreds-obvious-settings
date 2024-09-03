<div align="center">
  <img src="https://i.imgur.com/gOZy3Jf.png" width="200" height="200"/>
</div>
<h1 align="center">DFreds Obvious Settings</h1>

<h4 align="center">
  <a href="https://foundryvtt.com/packages/dfreds-obvious-settings">Install</a>
  ·
  <a href="https://discord.gg/Wq8AEV9bWb">Discord</a>
  ·
  <a href="https://github.com/topics/dfreds-modules">Other Modules</a>
</h4>

<p align="center">
    <a href="https://github.com/DFreds/dfreds-obvious-settings/pulse"><img src="https://img.shields.io/github/last-commit/DFreds/dfreds-obvious-settings?style=for-the-badge&logo=github&color=7dc4e4&logoColor=D9E0EE&labelColor=302D41"></a>
    <a href="https://github.com/DFreds/dfreds-obvious-settings/releases/latest"><img src="https://img.shields.io/github/v/release/DFreds/dfreds-obvious-settings?style=for-the-badge&logo=gitbook&color=8bd5ca&logoColor=D9E0EE&labelColor=302D41"></a>
    <a href="https://github.com/DFreds/dfreds-obvious-settings/stargazers"><img src="https://img.shields.io/github/stars/DFreds/dfreds-obvious-settings?style=for-the-badge&logo=apachespark&color=eed49f&logoColor=D9E0EE&labelColor=302D41"></a>
    <br>
    <br>
    <img src="https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/DFreds/dfreds-obvious-settings/main/static/module.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=fe6a1f&style=for-the-badge&logo=foundryvirtualtabletop">
    <a href="https://forge-vtt.com/bazaar#package=dfreds-obvious-settings"><img src="https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https://forge-vtt.com/api/bazaar/package/dfreds-obvious-settings&colorB=68a74f&style=for-the-badge&logo=condaforge"></a>
    <br>
    <img src="https://img.shields.io/github/downloads/DFreds/dfreds-obvious-settings/latest/dfreds-obvious-settings.zip?color=2b82fc&label=LATEST%20DOWNLOADS&style=for-the-badge">
    <img src="https://img.shields.io/github/downloads/DFreds/dfreds-obvious-settings/total?color=2b82fc&label=TOTAL%20DOWNLOADS&style=for-the-badge">
    <br>
    <br>
    <a href="https://www.patreon.com/dfreds"><img src="https://img.shields.io/badge/-Patreon-%23f96854?style=for-the-badge&logo=patreon"></a>
    <a href="https://www.buymeacoffee.com/dfreds"><img src="https://img.shields.io/badge/-Buy%20Me%20A%20Coffee-%23ff813f?style=for-the-badge&logo=buymeacoffee"></a>
    <a href="https://discord.gg/Wq8AEV9bWb"><img src="https://img.shields.io/badge/-Discord-%235865f2?style=for-the-badge"></a>
</p>

<p align="center">
    <b>DFreds Obvious Settings</b> is a FoundryVTT module that indicates if a setting is a world or client scope.
</p>

## Let Me Sell You This

When setting up your new game, isn't it a bit confusing which settings will
impact players, and which settings will only impact yourself? Well, now you
don't need to be confused.

## What This Module Does

This module adds a 🌎 icon before settings scoped to "world" (will be set for
all players) and a 👤 icon before settings scoped to "client" (personal settings
per user).

![Obvious Settings](docs/settings.png)

## Required Modules

- [libWrapper](https://foundryvtt.com/packages/lib-wrapper) by ruipin - A
  library that wraps core Foundry methods to make it easier for modules
  developers to do their thang. Note that if you for some reason don't want to
  install this, a shim will be used instead. You'll be pestered to install it
  though so... [just do it](https://www.youtube.com/watch?v=ZXsQAXx_ao0).
