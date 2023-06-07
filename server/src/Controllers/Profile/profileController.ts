import { RequestHandler } from "express"
import { fetchUserInformation, fetchUserFollowings, fetchUserFollowers } from "./profileApis";

export const getUserInformation: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await fetchUserInformation(username);
        console.log(user);

        if (user)
            res.status(200).send({ success: true, user, message: "User Found" })
        else res.status(404).send({ success: false, message: "User Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getUserFollowers: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const followers = await fetchUserFollowers(username);
        console.log(followers);

        if (followers)
            res.status(200).send({ success: true, followers, message: "Fetched followers successfully" })
        else res.status(404).send({ success: false, message: "User Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getUserFollowings: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const followings = await fetchUserFollowings(username);
        console.log(followings);

        if (followings)
            res.status(200).send({ success: true, followings, message: "Fetched followings successfully" })
        else res.status(404).send({ success: false, message: "Invalid Username" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}