import * as vscode from "vscode";

const getConfigs = () => vscode.workspace.getConfiguration("iconfont");

/**
 * 获取projectid
 */
export const getProjectId = () => getConfigs().get("projectId");

/**
 * 设置iconfont id
 * @param id iconfont项目id
 */
export const setProjectId = (id?: string) => {
  if (!id || !/^\d+$/.test(id)) {
    throw new Error("projectId 不能为空且只能是纯数值");
  }
  getConfigs().update("projectId", id);
};

/**
 * 获取高亮背景色
 */
export const getHighlightBgColor = () => getConfigs().get("highlight.bgColor");
