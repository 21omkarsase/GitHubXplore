import { RequestHandler } from "express";
import { fetchUserPublicRepos, fetchUserStarredRepos, fetchSingleRepo, fetchRepoCommits, fetchRepoContributors, fetchRepoLanguages, fetchRepoFilesStructure, fetchFileContent, fetchRepoIssues } from "./repoApis";

export const getUserPublicRepos: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;
        const repos = await fetchUserPublicRepos(username);

        if (repos)
            res.status(200).send({ success: true, repos, message: "Repos Found" })
        else res.status(404).send({ success: false, message: "Repos Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })
    }
}

export const getUserStarredRepos: RequestHandler<{ username: string }> = async (req, res, next) => {
    try {
        const username = req.params.username;

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
            res.status(200).send({ success: true, commits: repoCommits, message: "Repo commits Found" })
        else res.status(404).send({ success: false, message: "Repo commits Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

export const getRepoIssues: RequestHandler<{ username: string, reponame: string }> = async (req, res, next) => {
    try {
        const { username, reponame } = req.params;

        const repoIssues = await fetchRepoIssues(username, reponame);

        if (repoIssues)
            res.status(200).send({ success: true, issues: repoIssues, message: "Repo Issues Found" })
        else res.status(404).send({ success: false, message: "Repo Issues Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

export const getRepoContributors: RequestHandler<{ username: string, reponame: string }> = async (req, res, next) => {
    try {
        const { username, reponame } = req.params;

        const repoContributors = await fetchRepoContributors(username, reponame);

        if (repoContributors)
            res.status(200).send({ success: true, contributors: repoContributors, message: "Contributors Found" })
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
            res.status(200).send({ success: true, languages: repoLanguages, message: "Languages found" })
        else res.status(404).send({ success: false, message: "LanguagesNot Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

export const getRepoFilesStructure: RequestHandler = async (req, res, next) => {
    try {
        const { username, reponame, path, type } = req.body;

        const fileStructure = await fetchRepoFilesStructure(username, reponame, path, type);

        if (fileStructure)
            res.status(200).send({ success: true, fileStructure, message: "File structure Found" })
        else res.status(404).send({ success: false, message: "File structure Not Found" })
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" })

    }
}

export const getFileContent: RequestHandler = async (req, res, next) => {
    try {
        const { username, reponame, path } = req.body;

        const fileContent = await fetchFileContent(username, reponame, path);

        if (fileContent)
            res.status(200).send({ success: true, fileContent, message: "File Content Found" });
        else res.status(404).send({ success: false, message: "File Content Not Found" });
    } catch (error) {
        res.status(500).send({ success: false, message: error || "Internal Server Error" });
    }
}

