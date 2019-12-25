import * as vscode from "vscode";

let _cachePanel: null | vscode.WebviewPanel;

/**
 * 预览svg
 * @param svg svg数据
 */
export const previewSvg = (svg: string) => {
  const panel =
    _cachePanel ||
    vscode.window.createWebviewPanel(
      "show svg",
      "查看svg",
      vscode.ViewColumn.One,
      {}
    );
  _cachePanel = panel;
  panel.webview.html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>
      <img src="data:image/svg+xml,${encodeURIComponent(svg)}" width="300" />
  </body>
  </html>`;
};
