import * as vscode from "vscode";
import { IconfontItem } from "./provider";

/**
 * 复制iconfont属性
 * @param type 字段名称
 */
export const registerCopyCommand = (
  type: "font_class" | "unicode" | "show_svg"
) => {
  // 复制svg数据
  vscode.commands.registerCommand(
    `iconfont.copy.${type}`,
    (node: IconfontItem) => {
      vscode.env.clipboard.writeText(node.item[type]);
      vscode.window.showInformationMessage(`iconfont ${node.label}复制成功`);
    }
  );
};
