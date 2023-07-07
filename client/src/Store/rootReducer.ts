import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "../Features/userSlice"

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer;