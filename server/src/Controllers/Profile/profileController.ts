import { RequestHandler } from "express"
import { fetchUserInformation, fetchUserFollowings, fetchUserFollowers, fetchUserOrganizations } from "./profileApis";

export const getUserInformation: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await fetchUserInformation(username);

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

        if (followings)
            res.status(200).send({ success: true, followings, message: "Fetched followings successfully" })
        else res.status(404).send({ success: false, message: "Invalid Username" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getUserOrganizations: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const orgs = await fetchUserOrganizations(username);

        if (orgs)
            res.status(200).send({ success: true, orgs, message: "Organizations Found" })
        else res.status(404).send({ success: false, message: "Organizations Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}