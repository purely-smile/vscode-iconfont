import * as vscode from "vscode";
import { getIconfontDetail } from "./get-iconfont-detail";

const registerSuggestion = (language: string) => {
  const {
    project: { prefix },
    icons
  } = getIconfontDetail();
  return vscode.languages.registerCompletionItemProvider(language, {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character);
      // 如果输入的内容已prefix结尾，则输出智能提示
      // FIXME: 目前固定为icon前缀触发提示
      return !linePrefix.endsWith("icon")
        ? undefined
        : icons.map(({ font_class, name }) => {
            const item = new vscode.CompletionItem(
              [prefix, font_class].join(""),
              vscode.CompletionItemKind.Color
            );
            item.documentation = new vscode.MarkdownString(`icon名称:${name}`);
            return item;
          });
    }
  });
};

/**
 * 智能输入提示
 * @param context
 */
export const autoSuggestion = (context: vscode.ExtensionContext) => {
  const providers = [
    "vue",
    "html",
    "javascript",
    "typescript",
    "css"
  ].map(language => registerSuggestion(language));
  context.subscriptions.push(...providers);
};
