import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { getIconfontDir } from "./file-manage";
import { getIconfontDetail } from "./get-iconfont-detail";

// iconfont 单个元素
export class IconfontItem extends vscode.TreeItem {
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
    const dir = getIconfontDir();
    const filepath = path.resolve(dir, `${font_class}.svg`);
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, show_svg);
    }
    return vscode.Uri.file(filepath);
  }

  contextValue = "icon";
}

export class IconfontProvider implements vscode.TreeDataProvider<IconfontItem> {
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
