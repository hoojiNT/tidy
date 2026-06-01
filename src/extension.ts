import * as vscode from 'vscode';

const AGENT_FOLDERS = [
  '.junie', '.kilocode', '.kiro', '.kode', '.mcpjam', '.mux',
  '.neovate', '.openhands', '.pi', '.pochi', '.qoder', '.qwen',
  '.roo', '.trae', '.vibe', '.windsurf', '.zencoder',
];

function setAgentFoldersHidden(hidden: boolean): void {
  const config = vscode.workspace.getConfiguration('files');
  const exclude: Record<string, boolean> = { ...(config.get('exclude') ?? {}) };

  for (const folder of AGENT_FOLDERS) {
    const key = `**/${folder}`;
    if (hidden) {
      exclude[key] = true;
    } else {
      delete exclude[key];
    }
  }

  config.update('exclude', exclude, vscode.ConfigurationTarget.Workspace);
}

function areAgentFoldersHidden(): boolean {
  const exclude: Record<string, boolean> =
    vscode.workspace.getConfiguration('files').get('exclude') ?? {};
  return exclude[`**/${AGENT_FOLDERS[0]}`] === true;
}

export function activate(context: vscode.ExtensionContext): void {
  setAgentFoldersHidden(true);

  context.subscriptions.push(
    vscode.commands.registerCommand('tidy.toggleAgentFolders', () => {
      const nowHidden = areAgentFoldersHidden();
      setAgentFoldersHidden(!nowHidden);
      vscode.window.setStatusBarMessage(
        nowHidden ? 'Tidy: agent folders shown' : 'Tidy: agent folders hidden',
        3000,
      );
    }),
  );
}

export function deactivate(): void {}
