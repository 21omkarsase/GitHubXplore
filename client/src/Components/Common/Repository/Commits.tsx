import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../../../Store";
import { fetchRepositoryCommits } from "../../../Features/repoApi";
import { ImCross } from "react-icons/im"


const Commits: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);

    const { commits, username, reponame } = useSelector(
        (state: RootState) => state.repo
    );

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenModal = async () => {
        if (commits === undefined) {
            await dispatch(fetchRepositoryCommits({ username, reponame }));
            setIsOpen(true);
        } else setIsOpen(true);
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleOpenModal}
            >
                Commits
            </button>
            {isOpen && (
                <motion.div
                    className={`p-4 left-[25%] top-20 shadow-lg fixed flex justify-center bg-white overflow-y-scroll`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxHeight: "80vh" }}
                >
                    <div className="flex flex-col bg-white z-51 relative">
                        <div
                            className="px-10 header flex justify-between bg-white z-50"
                        >
                            <span className="text-2xl text-black">Commits</span>
                            <ImCross onClick={handleCloseModal} className="text-gray-500" />
                        </div>
                        <hr className="my-5 border border-gray-300" />
                        <div className="px-10">
                            {commits &&
                                commits.map((commit) => (
                                    <div key={commit.html_url} className="py-3 min-w-[40vw] max-w-[800px]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 user">
                                                <img className="w-[30px] h-[30px] rounded-full" src={commit.committer.avatar_url} alt="user" />
                                                <a className="text-black" target="_blank" href={commit.committer.html_url}>{commit.committer.login}</a>
                                            </div>
                                            <p className="text-black">{commit.commit.committer.date.split("T")[0]} {" | "} {commit.commit.committer.date.split("T")[1].split("Z"[0])}</p>
                                        </div>
                                        <p className="mx-10 text-black">{commit.commit.message}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Commits;
