import express from "express"
import { getUserPublicRepos, getUserStarredRepos, getSingleRepo, getRepoCommits, getRepoLanguages, getRepoFilesStructure, getFileContent, getRepoContributors, getRepoIssues } from "../Controllers/Repo/repoController";

const router = express.Router();

router.route("/:username").get(getUserPublicRepos);
router.route("/single/:username/:repo").get(getSingleRepo);
router.route("/starred/:username").get(getUserStarredRepos);
router.route("/commits/:username/:reponame").get(getRepoCommits);
router.route("/issues/:username/:reponame").get(getRepoIssues);
router.route("/languages/:username/:reponame").get(getRepoLanguages);
router.route("/contributors/:username/:reponame").get(getRepoContributors);
router.route("/file-structure").post(getRepoFilesStructure);
router.route("/file-content").post(getFileContent);



export default router;