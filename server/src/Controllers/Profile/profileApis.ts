import axios from "axios";
import { Response } from "express";

export const fetchUserInformation = async (username: string): Promise<{} | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchUserFollowers = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/followers`)
        const followers: {}[] = response.data;

        return followers;
    } catch (error) {
        return null;
    }
}

export const fetchUserFollowings = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/following`)
        const followings: {}[] = response.data;

        return followings;
    } catch (error) {
        return null;
    }
}

