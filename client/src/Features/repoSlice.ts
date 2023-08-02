import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRepositoryCommits, fetchRepositoryContent, fetchRepositoryContributors, fetchRepositoryIssues, fetchRepositoryLanguages, fetchSingleRepoInformation } from "./repoApi";

import { Repo } from "./reposSlice";
import { User } from "./userSlice";

export interface SingleRepo extends Repo {
    topics: string[];
    forks_count: number;
    size: number;
    watchers: number;
    open_issues: number;
    default_branch: string;
    open_issues_count: number;
    homepage: string | null;
    description?: string;
    [key: string]: any;
}

export interface FileStructure {
    name: string;
    path: string;
    url: string;
    html_url: string;
    type: 'dir' | 'file';
    [key: string]: string;
}
export interface Path {
    name: string;
    path: string;
    type: 'dir' | 'file'
}

export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface Commits {
    commit: {
        message: string;
        committer: {
            name: string;
            email?: string;
            date: string;
        }
        [key: string]: unknown;
    };
    html_url: string;
    committer: {
        login: string;
        avatar_url: string;
        html_url: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export interface Issue {
    title: string;
    html_url: string;
    created_at: string;
    user: {
        avatar_url: string;
        login: string;
        html_url: string;
        [key: string]: any;
    };
}

export interface Languages {
    [key: string]: number;
}

export interface RepoState {
    username: string;
    reponame: string;
    repoInfo?: SingleRepo;
    breadCrumb: Path[];
    currFileStructure: FileStructure[] | string;
    languages?: { [key: string]: number };
    commits?: Commits[];
    issues?: Issue[];
    contributors?: Contributor[];
    loading: {
        status: boolean,
        type?: 'filesLoading' | 'commitsLoading' | 'issuesLoading' | 'languagesLoading' | 'contributorsLoading' | 'repoInfoLoading'
    }
    error: {
        message: string | null;
        errorType?: 'filesError' | 'commitsError' | 'languagesError' | 'issuesError' | 'contributorsError' | 'repoInfoError';
    }
}

const initialState: RepoState = {
    username: "",
    reponame: "",
    breadCrumb: [],
    loading: { status: false },
    error: { message: null },
    currFileStructure: [],
}

export const reposSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        appendBreadCrumb: (state, action: PayloadAction<Path>): void => {
            if (state.breadCrumb.length === 0 || action.payload.path !== '')
                state.breadCrumb.push(action.payload);
        },

        sliceBreadCrumb: (state, action: PayloadAction<{ idx: number, path: Path }>): void => {
            state.breadCrumb = state.breadCrumb.slice(0, action.payload.idx + 1);
        },

        changeUserAndRepo: (state, action: PayloadAction<{ username: string, reponame: string }>): void => {
            state.username = action.payload.username;
            state.reponame = action.payload.reponame;
            state.commits = undefined;
            state.languages = undefined;
            state.contributors = undefined;
        },

        clearAndAppendBreadCrumb: (state, action: PayloadAction<Path>): void => {
            state.breadCrumb = [];
            state.breadCrumb.push(action.payload);
        },



    },
    extraReducers: (builder) => {
        builder.addCase(fetchRepositoryContent.pending, (state) => {
            state.loading = { status: true, type: "filesLoading" };
        })
        builder.addCase(fetchRepositoryContent.fulfilled, (state, action) => {
            state.currFileStructure = action.payload;


            state.loading = { status: false }
            state.error.message = null;
        })
        builder.addCase(fetchRepositoryContent.rejected, (state, action) => {
            state.loading = { status: false };

            state.error = {
                message: action.error.message!,
                errorType: 'filesError',
            };
        });

        builder.addCase(fetchRepositoryCommits.pending, (state) => {
            state.loading = { status: true, type: 'commitsLoading' }
        })
        builder.addCase(fetchRepositoryCommits.fulfilled, (state, action) => {
            state.commits = action.payload;
            state.loading = { status: false };
            state.error = { message: null };
        })
        builder.addCase(fetchRepositoryCommits.rejected, (state, action) => {
            state.error = {
                message: action.error.message!,
                errorType: 'commitsError',
            };
        })

        builder.addCase(fetchRepositoryIssues.pending, (state) => {
            state.loading = { status: true, type: 'issuesLoading' }
        })
        builder.addCase(fetchRepositoryIssues.fulfilled, (state, action) => {
            state.issues = action.payload;
            state.loading = { status: false };
            state.error = { message: null };
        })
        builder.addCase(fetchRepositoryIssues.rejected, (state, action) => {
            state.error = {
                message: action.error.message!,
                errorType: 'issuesError',
            };
        })

        builder.addCase(fetchRepositoryLanguages.pending, (state) => {
            state.loading = { status: true, type: 'commitsLoading' }
        })
        builder.addCase(fetchRepositoryLanguages.fulfilled, (state, action) => {
            state.languages = action.payload;
            state.loading = { status: false };
            state.error = { message: null };
        })
        builder.addCase(fetchRepositoryLanguages.rejected, (state, action) => {
            state.error = {
                message: action.error.message!,
                errorType: 'commitsError',
            };
        })

        builder.addCase(fetchRepositoryContributors.pending, (state) => {
            state.loading = { status: true, type: 'commitsLoading' }
        })
        builder.addCase(fetchRepositoryContributors.fulfilled, (state, action) => {
            state.contributors = action.payload;
            state.loading = { status: false };
            state.error = { message: null };
        })
        builder.addCase(fetchRepositoryContributors.rejected, (state, action) => {
            state.error = {
                message: action.error.message!,
                errorType: 'commitsError',
            };
        })


        builder.addCase(fetchSingleRepoInformation.pending, (state) => {
            state.loading = { status: true, type: 'repoInfoLoading' }
        })
        builder.addCase(fetchSingleRepoInformation.fulfilled, (state, action) => {
            state.repoInfo = action.payload;
            state.loading = { status: false };
            state.error = { message: null };
        })
        builder.addCase(fetchSingleRepoInformation.rejected, (state, action) => {
            state.error = {
                message: action.error.message!,
                errorType: 'repoInfoError',
            };
        })
    }
})

export const { changeUserAndRepo, appendBreadCrumb, sliceBreadCrumb, clearAndAppendBreadCrumb } = reposSlice.actions

export default reposSlice.reducer;
