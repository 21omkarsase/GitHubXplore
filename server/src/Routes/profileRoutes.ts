import express from "express"
import { getUserInformation, getUserFollowers, getUserFollowings } from "../Controllers/Profile/profileController";

const router = express.Router();

router.route("/:username").get(getUserInformation);
router.route("/followers/:username").get(getUserFollowers);
router.route("/followings/:username").get(getUserFollowings);

export default router;