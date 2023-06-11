import express from "express"
import { getUserPublicRepos, getUserStarredRepos, getSingleRepo, getRepoCommits, getRepoLanguages } from "../Controllers/Repo/repoController";

const router = express.Router();

router.route("/:username").get(getUserPublicRepos);
router.route("/single/:username/:repo").get(getSingleRepo);
router.route("/starred/:username").get(getUserStarredRepos);
router.route("/commits/:username/:reponame").get(getRepoCommits);
router.route("/languages/:username/:reponame").get(getRepoLanguages);



export default router;