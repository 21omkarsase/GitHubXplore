import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { isAxiosError } from "./userApi";
import { Commits, Contributor, FileStructure, Languages, Path } from "./repoSlice";

export const fetchRepositoryContent = createAsyncThunk<FileStructure[] | string,
    { username: string, reponame: string, currPath: Path }>(
        'repo/fetchRepoContent',

        async ({ username, reponame, currPath }) => {
            try {
                const config = {
                    method: 'post',
                    url: 'http://localhost:5000/repo/file-structure',
                    data: {
                        username,
                        reponame,
                        path: currPath.path,
                        type: currPath.type
                    },
                    "Content-Type": "application/json"
                }

                const { data } = await axios(config);

                return data.fileStructure;
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
        }
    )

export const fetchRepositoryCommits = createAsyncThunk<Commits[],
    { username: string, reponame: string }>(
        'repo/fetchRepoCommits',
        async ({ username, reponame }) => {
            try {
                const { data } = await axios.get(`http://localhost:5000/repo/commits/${username}/${reponame}`);

                return data.commits;
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
        }
    )

export const fetchRepositoryLanguages = createAsyncThunk<Languages, { username: string, reponame: string }>(
    'repo/fetchRepoLanguages', async ({ username, reponame }) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/repo/languages/${username}/${reponame}`)

            return data.languages;
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
    }
)

export const fetchRepositoryContributors = createAsyncThunk<Contributor[], { username: string, reponame: string }>(
    'repo/fetchRepoContributors', async ({ username, reponame }) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/repo/contributors/${username}/${reponame}`)
            return data.contributors;
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
    }
)