import * as fs from "fs";
import * as path from "path";
import * as del from "del";
import * as vscode from "vscode";
import { getProjectId } from "./configs";

/**
 * 获取iconfont存储目录
 */
export const getIconfontDir = () => {
  const projectId = getProjectId();
  if (!projectId) {
    throw new Error("请参考文档配置iconfont project");
  }
  return path.resolve(`/tmp/iconfont/${projectId}`);
};

/**
 * 设置iconfont缓存目录
 */
export const removeIconfontDir = () => {
  const dir = getIconfontDir();
  if (fs.existsSync(dir)) {
    try {
      del.sync(dir, { force: true });
      vscode.window.showInformationMessage("缓存已清空");
    } catch (e) {
      vscode.window.showErrorMessage(e.message);
      throw e;
    }
  }
};
