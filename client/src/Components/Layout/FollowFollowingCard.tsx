import React from 'react';
import { motion } from 'framer-motion';

interface FollowerUser {
    username: string;
    avatar: string;
}

const FollowFollowingCard: React.FC<FollowerUser> = ({ username, avatar }) => {
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
                    <h2 className="text-xl font-bold">{username}</h2>
                    <p className="text-gray-500">Card content goes here...</p>
                </div>
            </div>

            <p className="text-gray-500">Additional information...</p>
        </motion.div>
    );
};

export default FollowFollowingCard;
