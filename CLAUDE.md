# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run compile      # compile TypeScript → out/
npm run watch        # watch mode
npx @vscode/vsce package   # build tidy-x.x.x.vsix
npx @vscode/vsce publish -p <PAT>  # publish to VS Marketplace
```

Press **F5** in VS Code to launch an Extension Development Host for manual testing.

## Architecture

Single-file extension (`src/extension.ts`). No runtime dependencies.

- **`AGENT_FOLDERS`** — hardcoded list of 17 AI agent dot-folders to hide.
- **`setAgentFoldersHidden(hidden)`** — reads `files.exclude` from the workspace config, adds or removes `**/<folder>` keys, then writes back to `ConfigurationTarget.Workspace` (persists in `.vscode/settings.json`).
- **`areAgentFoldersHidden()`** — checks the first agent folder's key in `files.exclude` to infer current state.
- **`activate`** — calls `setAgentFoldersHidden(true)` immediately, then registers the `tidy.toggleAgentFolders` command.

## Publishing

Publisher ID is `hoojiNT` (set in `package.json`). A Marketplace PAT with **Marketplace → Manage** scope is required to publish. The PAT is never stored in the repo.
