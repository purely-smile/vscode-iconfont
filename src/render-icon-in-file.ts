import * as vscode from "vscode";
import * as path from "path";
import { getIconfontDetail } from "./get-iconfont-detail";
import { getIconfontDir } from "./file-manage";

/**
 * 获取匹配font_class正则
 */
const getReg = (): RegExp => {
  const {
    icons,
    project: { prefix }
  } = getIconfontDetail();
  const str = icons.map(icon => `${prefix}${icon.font_class}`).join("|");
  return new RegExp(str);
};

const cache: Record<string, vscode.TextEditorDecorationType> = {};

const render = () => {
  const { activeTextEditor: editor } = vscode.window;
  if (!editor) {
    return null;
  }
  const reg = getReg();
  const { lineCount } = editor.document;
  new Array(lineCount).fill(null).forEach((val, index) => {
    const line = editor.document.lineAt(index);
    const matcher = line.text.match(reg);
    if (matcher) {
      const font_class = matcher[0].replace(/^icon/, "");
      const dir = getIconfontDir();
      const filepath = path.resolve(dir, `${font_class}.svg`);
      const decorations: vscode.DecorationOptions[] = [
        {
          range: new vscode.Range(index, 0, index, 0),
          hoverMessage: ""
        }
      ];
      let decorationRenderOptions: vscode.DecorationRenderOptions = {
        gutterIconPath: vscode.Uri.file(filepath),
        gutterIconSize: "contain"
      };
      let textEditorDecorationType: vscode.TextEditorDecorationType = vscode.window.createTextEditorDecorationType(
        <any>decorationRenderOptions
      );
      if (cache[index]) {
        cache[index].dispose();
      }
      cache[index] = textEditorDecorationType;
      vscode.window.activeTextEditor.setDecorations(
        textEditorDecorationType,
        decorations
      );
    } else {
      if (cache[index]) {
        cache[index].dispose();
        delete cache[index];
      }
    }
  });
};

export const renderIconInFile = (context: vscode.ExtensionContext) => {
  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor) {
      render();
    }
  });

  vscode.workspace.onDidChangeTextDocument(
    event => {
      render();
    },
    null,
    context.subscriptions
  );
};
