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
}
