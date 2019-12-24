import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

const output = path.resolve("/tmp", "iconfont-detail.json");

const getJson = () => {
  return JSON.parse(fs.readFileSync(output, "utf8"));
};

/**
 * 获取iconfont详情
 */
export const getIconfontDetail = () => {
  const { projectId } = vscode.workspace.getConfiguration("iconfont");
  if (!projectId) {
    throw new Error("请配置projectId");
  }
  if (!fs.existsSync(output)) {
    execSync(` download-iconfont -p ${projectId} --json --output ${output}`);
  }
  return getJson();
};
