import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserRepos } from "./repoApi"

interface FileStructure {

}
export interface Repo {
    name: string;
    full_name: string;
    owner: {
        name: string;
        avatar_url: string;
        github_url: string;
    };
    github_url: string;
    clone_url: string;
    primary_language: string;
    created_at: string;
    tags?: [];
    branches?: [];
    comments?: [];
    languages?: [];
    contributors?: [];
    issues?: [];
}

interface RepoError {
    message: string;
    errorType: 'repoError' | 'singleRepoError' | 'commentsError' | 'branchesError' | 'contributorsError' | 'issuesError' | 'languagesError';
}

interface RepoState {
    currUserRepos?: {
        [key: string]: Repo;
    };
    repos: {
        [key: string]: {
            [key: string]: Repo,
        };
    };
    status: 'idle' | 'succeeded' | 'failed' | 'pending';
    error: RepoError | null;
}

const initialState: RepoState = {
    repos: {},
    status: 'idle',
    error: null
}

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        changeCurrUserRepos: (state, action: PayloadAction<string>) => {
            state.status = 'pending';
            state.currUserRepos = state.repos[action.payload];
            state.status = 'succeeded';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserRepos.pending, (state) => {
            state.status = 'pending';
        })
        builder.addCase(fetchUserRepos.fulfilled, (state, action) => {
            state.repos[action.payload.username] = action.payload.repos;
            state.currUserRepos = action.payload.repos;
            state.status = 'succeeded';
        })
        builder.addCase(fetchUserRepos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = {
                message: action.error.message!,
                errorType: 'repoError'
            }
        })
    }
})

export const { changeCurrUserRepos } = repoSlice.actions;

export default repoSlice.reducer;