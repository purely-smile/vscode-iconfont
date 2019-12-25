import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { getIconfontDir } from "./file-manage";
import { getProjectId } from "./configs";

/**
 * 获取iconfont详情
 */
export const getIconfontDetail = () => {
  const projectId = getProjectId();
  const dir = getIconfontDir();
  const output = path.resolve(dir, "iconfont-detail.json");

  const getJson = () => {
    return JSON.parse(fs.readFileSync(output, "utf8"));
  };
  if (!fs.existsSync(output)) {
    execSync(` download-iconfont -p ${projectId} --json --output ${output}`);
  }
  return getJson();
};
