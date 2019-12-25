import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getIconfontDetail } from "./get-iconfont-detail";

// iconfont 单个元素
class IconfontItem extends vscode.TreeItem {
  constructor(
    public item: { name: string; font_class: string; show_svg: string }
  ) {
    super(item.name, vscode.TreeItemCollapsibleState.None);
    this.label = item.name;
  }

  get tooltip() {
    const { label, description } = this;
    return [label, description].join("-");
  }

  get description() {
    return this.item.font_class;
  }

  get iconPath() {
    const { font_class, show_svg } = this.item;
    const { projectId } = vscode.workspace.getConfiguration("iconfont");
    const filepath = path.resolve(
      `/tmp/iconfont/${projectId}/`,
      `${font_class}.svg`
    );
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, show_svg);
    }
    return vscode.Uri.file(filepath);
  }

  contextValue = "icon";
}

class IconfontProvider implements vscode.TreeDataProvider<any> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    IconfontItem | undefined
  > = new vscode.EventEmitter<IconfontItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<IconfontItem | undefined> = this
    ._onDidChangeTreeData.event;

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(
    element: IconfontItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  getChildren(): vscode.ProviderResult<any[]> {
    const { icons } = getIconfontDetail();
    const items = icons.map((item: any) => {
      return new IconfontItem(item);
    });
    return Promise.resolve(items);
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provider = new IconfontProvider();
  vscode.window.registerTreeDataProvider("iconfontList", provider);

  // 注册命令
  vscode.commands.registerCommand("iconfont.refreshEntry", () => {
    provider.refresh();
  });

  // 注册设置project命令
  vscode.commands.registerCommand("iconfont.setProject", async () => {
    const input = await vscode.window.showInputBox({
      placeHolder: "请输入iconfont projectId"
    });
    if (!input || !/^\d+$/.test(input)) {
      throw new Error("projectId 不能为空且只能是纯数值");
    }
    vscode.workspace.getConfiguration("iconfont").update("projectId", input);
    vscode.window.showInformationMessage("配置成功，请重启编辑器");
  });

  vscode.commands.registerCommand("iconfont.copy", (node: IconfontItem) => {
    vscode.env.clipboard.writeText(node.description);
    vscode.window.showInformationMessage(`iconfont ${node.label}复制成功`);
  });
}
