import React, { useState } from 'react'
import { motion } from "framer-motion"
import { changeCurrentUser } from "../../../Features/userSlice"
import { fetchUserInfo } from '../../../Features/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store';

const SearchComponent: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    const { users } = useSelector((state: RootState) => state.user)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (users.hasOwnProperty(username)) {
            dispatch(changeCurrentUser(username));
        } else {
            dispatch(fetchUserInfo(username));
        }

        setUsername("");
    }

    return (
        <div className="bg-blue-400 h-96 flex justify-center items-center">
            <motion.form
                onSubmit={submitHandler}
                className="bg-white rounded-full shadow px-6 py-2 flex items-center w-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <input
                    required
                    type="text"
                    className="outline-none p-2 mr-2 w-full"
                    placeholder="Search"
                    value={username}
                    onChange={changeHandler}
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Go
                </button>
            </motion.form>
        </div>
    )
}

export default SearchComponent