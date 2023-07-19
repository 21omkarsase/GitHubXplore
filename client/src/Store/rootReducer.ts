import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "../Features/userSlice"
import reposReducer from "../Features/reposSlice";
import repoReducer from "../Features/repoSlice";

const rootReducer = combineReducers({
    user: userReducer,
    repos: reposReducer,
    repo: repoReducer
})

export default rootReducer;