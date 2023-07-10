import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import { fetchUserInfo } from '../../Features/userApi';
import { changeCurrentUser } from '../../Features/userSlice';

interface FollowerUser {
    username: string;
    avatar: string;
}

const FollowFollowingCard: React.FC<FollowerUser> = ({ username, avatar }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { users } = useSelector((state: RootState) => state.user)

    const fetchUserHandler = () => {
        if (users.hasOwnProperty(username)) {
            dispatch(changeCurrentUser(username));
        } else {
            dispatch(fetchUserInfo(username));
        }

        navigate("/");
    }

    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex items-center mb-4 cursor-pointer">
                <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={avatar}
                    alt="Avatar"
                />
                <div>
                    <h2 onClick={fetchUserHandler} className="text-xl font-bold">{username}</h2>
                    <p className="text-gray-500">Card content goes here...</p>
                </div>
            </div>

            <p className="text-gray-500">Additional information...</p>
        </motion.div>
    );
};

export default FollowFollowingCard;
