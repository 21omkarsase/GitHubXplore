import React from 'react'
import { motion } from 'framer-motion'
import { Repo } from '../../Features/reposSlice'
import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom';

interface RepoCardProps {
    repo: Repo;
}
const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    const date = new Date(repo.created_at);
    const dateInIst = date.toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' });

    return (
        <div className="flex justify-center items-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="min-w-[400px] bg-white rounded-lg shadow-lg p-6 max-w-md"
            >
                <div className="flex gap-5 justify-between">
                    <Link to={`/${repo.owner.name}/${repo.name}`}> <h2 className="text-2xl font-bold mb-4">{repo.name}</h2></Link>
                    <a target='_blank' href={repo.github_url}>
                        <FaGithub className='text-2xl' />
                    </a>
                </div>
                <p className="text-gray-500 mb-3">
                    <span>
                        Created on
                    </span>
                    <span className='text-gray-900'>
                        {" "}{dateInIst.split(',')[0]}
                    </span>
                </p>
                <p className="text-gray-600">
                    <span>Primary Language </span>
                    <span className='text-gray-900'>{repo.primary_language}</span>
                </p>
            </motion.div>
        </div>
    )
}

export default RepoCard