import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../../Store';
import InformationText from './InformationText';
import InfoTab from './InfoBox';
import { FaGithub, FaTwitter } from 'react-icons/fa'

const UserInformation: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const imageStyles = {
        width: '400px',
        height: '400px',
        borderRadius: '50%',
    };

    return (
        <motion.div className="flex py-10 gap-96 mx-auto max-w-[80%] min-h-[500px]">
            <motion.img
                style={imageStyles}
                src={user.avatar}
                alt="Github Profile Image"
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.7 }}
                className="self-start items-center"
            />
            <motion.div className='w-full'>
                <div className='flex w-3/4 justify-between'>
                    <InformationText property="Name" value={user.name} />
                    <motion.a
                        href={user.githubUrl}
                        target='_blank'
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className='flex items-center gap-3'>
                        <FaGithub />
                        <motion.div
                            className="flex"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="font-bold">{user.userName}</span>
                        </motion.div>
                    </motion.a>
                </div>
                {(user.email || user.twitterUserName) &&
                    <div className='flex w-3/4 justify-between'>
                        {user.email && <InformationText property="Email" value={user.email} />}
                        {user.twitterUserName &&
                            <motion.a
                                href={`https://twitter.com/${user.twitterUserName}`}
                                target='_blank'
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className='flex items-center gap-3'>
                                <FaTwitter />
                                <motion.div
                                    className="flex"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="font-bold">{user.twitterUserName}</span>
                                </motion.div>
                            </motion.a>}
                    </div>}
                <div className="w-3/4 my-5 flex justify-between">
                    <InfoTab property="Followers" value={user.followers} />
                    <InfoTab property="Following" value={user.followings} />
                </div>
                <InfoTab property="Repository" value={user.repoCount} />
            </motion.div>
        </motion.div>
    );
};

export default UserInformation;
