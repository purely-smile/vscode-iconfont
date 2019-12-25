interface IconfontProjectInfo {
  project: Project;
  font: Font;
  users: User[];
  creator: Creator;
  icons: Icon[];
}

interface Icon {
  id: number;
  name: string;
  project_id: number;
  projectId: number;
  show_svg: string;
  unicode: string;
  font_class: string;
  freeze: number;
  path_attributes: string;
}

interface Creator {
  avatar: string;
  weixin_code: string;
  alipay_code: string;
  id: number;
  nickname: string;
  bio?: any;
  role: number;
  avatar_file_name?: any;
  avatar_tiny_file_name?: any;
  avatar_small_file_name?: any;
  status: number;
  from_site?: any;
  account_type: number;
  created_at: string;
  updated_at: string;
}

interface User {
  avatar: string;
  weixin_code: string;
  alipay_code: string;
  id: number;
  nickname: string;
  bio?: string;
  role: number;
  avatar_file_name?: any;
  avatar_tiny_file_name?: any;
  avatar_small_file_name?: any;
  status: number;
  from_site?: string;
  account_type: number;
  created_at: string;
  updated_at: string;
  ProjectUser: ProjectUser;
}

interface ProjectUser {
  id: number;
  user_id: number;
  project_id: number;
}

interface Font {
  svg_file: string;
  woff_file: string;
  woff2_file: string;
  eot_file: string;
  ttf_file: string;
  js_file: string;
  css_file: string;
  id: number;
  owner_id: number;
  owner_type: string;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  name: string;
  status?: any;
  description: string;
  create_user_id: string;
  /** iconfont前缀 */
  prefix: string;
  font_family: string;
  font_is_old: number;
  created_at: string;
  updated_at: string;
}
