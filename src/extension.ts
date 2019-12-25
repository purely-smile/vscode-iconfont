import * as vscode from "vscode";
import { setProjectId } from "./configs";
import { removeIconfontDir } from "./file-manage";
import { IconfontProvider, IconfontItem } from "./provider";

export function activate() {
  const provider = new IconfontProvider();
  vscode.window.registerTreeDataProvider("iconfontList", provider);

  // 注册刷新命令
  vscode.commands.registerCommand("iconfont.refreshEntry", () => {
    removeIconfontDir();
    provider.refresh();
  });

  // 注册设置project命令
  vscode.commands.registerCommand("iconfont.setProject", async () => {
    const input = await vscode.window.showInputBox({
      placeHolder: "请输入iconfont projectId（参考插件首页文档获取id）"
    });
    setProjectId(input);
    vscode.window.showInformationMessage("配置成功，请重启编辑器");
  });

  // 注册复制命令
  vscode.commands.registerCommand("iconfont.copy", (node: IconfontItem) => {
    vscode.env.clipboard.writeText(node.description);
    vscode.window.showInformationMessage(`iconfont ${node.label}复制成功`);
  });
}
