import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRepositoryContent } from "./repoApi";


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
export interface RepoState {
    breadCrumb: Path[];
    currFileStructure: FileStructure[] | string;
    languages?: [];
    commits?: [];
    contributors?: [];
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

        clearAndAppendBreadCrumb: (state, action: PayloadAction<Path>): void => {
            state.breadCrumb = [];
            state.breadCrumb.push(action.payload);
        }

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
            state.error = {
                message: action.error.message!,
                errorType: 'filesError',
            };
        });
    }
})

export const { appendBreadCrumb, sliceBreadCrumb, clearAndAppendBreadCrumb } = reposSlice.actions

export default reposSlice.reducer;
