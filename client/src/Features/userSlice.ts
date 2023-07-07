import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from '../Store'
import { fetchUserInfoAPI } from "./userApi"
import { AxiosError } from 'axios';

interface User {
    name: string;
    avatar: string;
    githubUrl: string;
    userName: string;
    repoCount: string;
    followers: string;
    followings: string;
    company?: string;
    blog?: string;
    email?: string;
    twitterUserName?: string;
    bio?: string;
    orgs?: object;
}

interface UserState {
    users: User[];
    user: User,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: {
        name: "Omkar Sase",
        avatar: "https://avatars.githubusercontent.com/u/77478864?v=4",
        githubUrl: "https://github.com/21omkarsase",
        userName: "21omkarsase",
        repoCount: '18',
        followers: '14',
        followings: '14',
        email: "saseomkar214@gmail.com",
        twitterUserName: "21omkarsase",
    },
    status: "succeeded",
    error: null,
}

function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
}

export const fetchUserInfo = createAsyncThunk<User, string>(
    'user/fetchUserInfo',
    async (username: string) => {
        try {
            const { user: userInfo } = await fetchUserInfoAPI(username);

            const user: User = {
                name: userInfo.name,
                avatar: userInfo.avatar_url,
                githubUrl: userInfo.html_url,
                userName: userInfo.login,
                repoCount: userInfo.public_repos,
                followers: userInfo.followers,
                followings: userInfo.followings,
            };

            if (userInfo.bio)
                user.bio = userInfo.bio;
            if (userInfo.email)
                user.email = userInfo.email
            if (userInfo.twitterUserName)
                user.twitterUserName = userInfo.twitterUserName;
            if (userInfo.blog)
                user.blog = userInfo.blog;

            return user;

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
);

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message!;
            })
    },
})


export const selectedCurrentUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
