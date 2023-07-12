import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "../Features/userSlice"
import repoReducer from "../Features/repoSlice";

const rootReducer = combineReducers({
    user: userReducer,
    repo: repoReducer,
})

export default rootReducer;