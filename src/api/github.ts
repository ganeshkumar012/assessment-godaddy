import axios from "axios";
import type { Repo }  from "../types/repo";


export const fetchRepos = async (): Promise<Repo[]> => {
    const res = await axios.get<Repo[]>('https://api.github.com/orgs/godaddy/repos');
    return res.data;
};