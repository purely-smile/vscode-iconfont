import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { getIconfontDir } from "./file-manage";
import { getProjectId } from "./configs";

// 缓存当前项目的iconfont详情数据
let _cacheDetail: null | IconfontProjectInfo = null;

/**
 * 获取iconfont详情
 */
export const getIconfontDetail = (): IconfontProjectInfo => {
  if (_cacheDetail) {
    return _cacheDetail;
  }
  const projectId = getProjectId();
  const dir = getIconfontDir();
  const output = path.resolve(dir, "iconfont-detail.json");

  const getJson = () => {
    const data = JSON.parse(fs.readFileSync(output, "utf8"));
    _cacheDetail = data;
    return data;
  };
  if (!fs.existsSync(output)) {
    execSync(` download-iconfont -p ${projectId} --json --output ${output}`);
  }
  return getJson();
};

/**
 * 清空iconfont详情的缓存
 */
export const deleteIconfontDetailCache = () => {
  _cacheDetail = null;
};
