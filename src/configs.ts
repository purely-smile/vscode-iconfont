import * as vscode from "vscode";

/**
 * 获取projectid
 */
export const getProjectId = () =>
  vscode.workspace.getConfiguration("iconfont").get("projectId");

/**
 * 设置iconfont id
 * @param id iconfont项目id
 */
export const setProjectId = (id?: string) => {
  if (!id || !/^\d+$/.test(id)) {
    throw new Error("projectId 不能为空且只能是纯数值");
  }
  vscode.workspace.getConfiguration("iconfont").update("projectId", id);
};
