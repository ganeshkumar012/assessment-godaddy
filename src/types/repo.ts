export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  stargazers_count: number;
  topics : number
  has_issues : boolean;
  has_wiki:boolean;
  fork : boolean;
  archived: boolean;
  full_name:string;
  created_at:string;
  updated_at:string;
  pushed_at:string;
  size:number;
  default_branch:string;
  visibility:string;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  clone_url:string;
}
