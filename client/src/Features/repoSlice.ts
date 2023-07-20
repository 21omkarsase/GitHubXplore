import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRepositoryCommits, fetchRepositoryContent, fetchRepositoryContributors, fetchRepositoryLanguages } from "./repoApi";


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

export interface Languages {
    [key: string]: number;
}

export interface RepoState {
    username: string;
    reponame: string;
    breadCrumb: Path[];
    currFileStructure: FileStructure[] | string;
    languages?: { [key: string]: number };
    commits?: Commits[];
    contributors?: Contributor[];
    loading: {
        status: boolean,
        type?: 'filesLoading' | 'commitsLoading' | 'languagesLoading' | 'contributorsLoading'
    }
    error: {
        message: string | null;
        errorType?: 'filesError' | 'commitsError' | 'languagesError' | 'contributorsError';
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
            console.log("payload", action.payload);

            state.loading = { status: false }
        })
        builder.addCase(fetchRepositoryContent.rejected, (state, action) => {
            state.loading = { status: false };
            console.log(action.error);

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
    }
})

export const { changeUserAndRepo, appendBreadCrumb, sliceBreadCrumb, clearAndAppendBreadCrumb } = reposSlice.actions

export default reposSlice.reducer;
