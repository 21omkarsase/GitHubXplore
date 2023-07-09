import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchUserFollowers, fetchUserInfo, fetchUserFollowing } from "./userApi";


export interface FollowFollowing {
    login: string;
    avatar_url: string;
    [key: string]: any;
}
export interface User {
    name: string;
    avatar: string;
    githubUrl: string;
    userName: string;
    repoCount: string;
    followers: string;
    followings: string;
    followersData?: FollowFollowing[];
    followingData?: FollowFollowing[];
    company?: string;
    blog?: string;
    email?: string;
    twitterUserName?: string;
    bio?: string;
    orgs?: object;
}

interface UserError {
    message: string;
    errorType: 'userInfoError' | 'followersError' | 'followingError';
}
export interface UserState {
    users: {
        [key: string]: User;
    };
    user: User,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: UserError | null;
}

const initialState: UserState = {
    users: {
        "21omkarsase": {
            name: "Omkar Sase",
            avatar: "https://avatars.githubusercontent.com/u/77478864?v=4",
            githubUrl: "https://github.com/21omkarsase",
            userName: "21omkarsase",
            repoCount: '18',
            followers: '14',
            followings: '14',
            email: "saseomkar214@gmail.com",
            twitterUserName: "21omkarsase",
        }
    },
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

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        changeCurrentUser(state, action: PayloadAction<string>) {
            state.user = state.users[action.payload]!;
            state.status = 'succeeded';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users[action.payload.userName] = action.payload;
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = {
                    message: action.error.message!,
                    errorType: 'userInfoError'
                };
            })
            .addCase(fetchUserFollowers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserFollowers.fulfilled, (state, action) => {
                const username = action.payload["username"];

                state.users[username].followersData = action.payload.followers as FollowFollowing[];
                state.user.followersData = action.payload.followers as FollowFollowing[];
                state.status = 'succeeded';
            })
            .addCase(fetchUserFollowers.rejected, (state, action) => {
                state.error = {
                    message: action.error.message!,
                    errorType: 'followersError'
                };
                state.status = 'failed';
            })
            .addCase(fetchUserFollowing.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserFollowing.fulfilled, (state, action) => {
                const username = action.payload.username;
                state.users[username].followingData = action.payload.following as FollowFollowing[];
                state.user.followingData = action.payload.following as FollowFollowing[];

                state.status = 'succeeded';
            })
            .addCase(fetchUserFollowing.rejected, (state, action) => {
                state.error = {
                    message: action.error.message!,
                    errorType: 'followingError'
                };
                state.status = 'failed';
            })
    },
})


export default userSlice.reducer;

export const { changeCurrentUser } = userSlice.actions;
