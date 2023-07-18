import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Repo } from "./repoSlice";
import axios from "axios";
import { isAxiosError } from "./userApi";

interface RepoObject {
    [key: string]: Repo;
}

export const fetchUserRepos = createAsyncThunk<{ repos: RepoObject, username: string, }, string>('repo/fetchUserRepos',
    async (username: string) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/repo/${username}`);

            const repoData = data.repos;

            const repos: RepoObject = {};

            for (const repo of repoData) {
                const currRepo: Repo = {
                    name: repo.name,
                    full_name: repo.full_name || repo.name,
                    owner: {
                        name: repo.owner.login!,
                        avatar_url: repo.owner.avatar_url!,
                        github_url: repo.owner.html_url,
                    },
                    github_url: repo.html_url,
                    clone_url: repo.clone_url,
                    primary_language: repo.language,
                    created_at: repo.created_at,
                }

                repos[repo.name] = currRepo;
            }

            return { username, repos };
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response)
                    throw new Error((error.response.data as any).message);

                if (error.request) {
                    throw new Error("Check your internet connection and try again");
                }

                throw new Error("Internal Server Error");
            }

            throw new Error("Internal Server Error");
        }
    })
