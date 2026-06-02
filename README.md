Tidy

Hide AI agent folders from the VS Code Explorer.

## Usage

- Extension hides a set of known AI agent folders by default.
- You can add more folders to hide via workspace settings.

### Settings

Add the following to your workspace `.vscode/settings.json`:

```json
{
  "tidy.additionalFolders": [
    "kilo",
    ".myagent",
    "custom-agent"
  ]
}
```

The extension will prefix entries without a leading dot, so `kilo` becomes `.kilo`.

## Development

Compile and package the extension:

```bash
npm run compile
npx @vscode/vsce package
```

Install locally for testing:

```bash
code --install-extension tidy-0.0.1.vsix --force
```

## Publishing

To publish to the VS Code Marketplace you need a Personal Access Token with the right scopes. Then run:

```bash
npx @vscode/vsce publish
```

Set the token in the environment as `VSCE_TOKEN` or follow `vsce`'s auth instructions.

## License

MIT
