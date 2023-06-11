import express from "express"
import { getUserInformation, getUserFollowers, getUserFollowings, getUserOrganizations } from "../Controllers/Profile/profileController";

const router = express.Router();

router.route("/:username").get(getUserInformation);
router.route("/followers/:username").get(getUserFollowers);
router.route("/followings/:username").get(getUserFollowings);
router.route("/orgs/:username").get(getUserOrganizations)

export default router;