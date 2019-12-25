import * as vscode from "vscode";
import { setProjectId } from "./configs";
import { removeIconfontDir } from "./file-manage";
import { IconfontProvider, IconfontItem } from "./provider";
import { previewSvg } from "./preview-svg";
import { registerCopyCommand } from "./register-copy-command";

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

  // 注册复制class命令
  registerCopyCommand("font_class");

  // 复制svg数据
  registerCopyCommand("show_svg");

  // 复制unicode
  registerCopyCommand("unicode");

  // 查看svg大图
  vscode.commands.registerCommand("iconfont.show.svg", (node: IconfontItem) => {
    const { show_svg } = node.item;
    previewSvg(show_svg);
  });
}
