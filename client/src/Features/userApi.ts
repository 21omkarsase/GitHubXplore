import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User } from './userSlice';
interface Followers {
    username: string;
    followers: {}[];
}
interface Following {
    username: string;
    following: {}[];
}

function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
}

export const fetchUserInfo = createAsyncThunk<User, string>(
    'user/fetchUserInfo',
    async (username: string) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/user/${username}`);

            const userInfo = data.user;


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
            if (userInfo.twitter_username)
                user.twitterUserName = userInfo.twitter_username;
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

export const fetchUserFollowers = createAsyncThunk<Followers, string>(
    'user/fetchUserFollowers',
    async (username: string) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/user/followers/${username}`);

            return { username, followers: data.followers };
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

export const fetchUserFollowing = createAsyncThunk<Following, string>(
    'user/fetchUserFollowing',
    async (username: string) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/user/followings/${username}`);
            return { username, following: data.followings };
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

export const fetchOrgsAPI = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/user/orgs/${username}`);
    return response.data;
};
