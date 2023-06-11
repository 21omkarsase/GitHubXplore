import { RequestHandler } from "express";
import { fetchUserPublicRepos, fetchUserStarredRepos, fetchSingleRepo, fetchRepoCommits, fetchRepoContributors, fetchRepoLanguages } from "./repoApis";

export const getUserPublicRepos: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const repo = await fetchUserPublicRepos(username);

        if (repo)
            res.status(200).send({ success: true, repo, message: "Repos Found" })
        else res.status(404).send({ success: false, message: "Repos Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getUserStarredRepos: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        console.log(username);

        const starredRepos = await fetchUserStarredRepos(username);

        if (starredRepos)
            res.status(200).send({ success: true, starredRepos, message: "Repos Found" })
        else res.status(404).send({ success: false, message: "Repos Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getSingleRepo: RequestHandler<{ username: string, repo: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const reponame = req.params.repo;
        const singleRepo = await fetchSingleRepo(username, reponame);

        if (singleRepo)
            res.status(200).send({ success: true, singleRepo, message: "Repo Found" })
        else res.status(404).send({ success: false, message: "Repo Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getRepoCommits: RequestHandler<{ username: string, reponame: string }> = async (req, res, next) => {
    try {
        const { username, reponame } = req.params;

        const repoCommits = await fetchRepoCommits(username, reponame);

        if (repoCommits)
            res.status(200).send({ success: true, repoCommits, message: "Repo commits Found" })
        else res.status(404).send({ success: false, message: "Repo commits Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

export const getRepoContributors: RequestHandler<{ username: string, reponame: string }> = async (req, res, next) => {
    try {
        const { username, reponame } = req.params;

        const repoContributors = await fetchRepoContributors(username, reponame);

        if (repoContributors)
            res.status(200).send({ success: true, repoContributors, message: "Contributors Found" })
        else res.status(404).send({ success: false, message: "Contributors Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

export const getRepoLanguages: RequestHandler<{ username: string, reponame: string }> = async (req, res, next) => {
    try {
        const { username, reponame } = req.params;

        const repoLanguages = await fetchRepoLanguages(username, reponame);

        if (repoLanguages)
            res.status(200).send({ success: true, repoLanguages, message: "Repo languages Found" })
        else res.status(404).send({ success: false, message: "Repo languages Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

