import * as vscode from "vscode";

const panel = vscode.window.createWebviewPanel(
  "show svg",
  "查看svg",
  vscode.ViewColumn.One,
  {}
);

/**
 * 预览svg
 * @param svg svg数据
 */
export const previewSvg = (svg: string) => {
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
