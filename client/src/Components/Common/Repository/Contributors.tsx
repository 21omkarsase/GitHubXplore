import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../../../Store";
import { fetchRepositoryContributors } from "../../../Features/repoApi";
import { ImCross } from "react-icons/im"


const Contributors: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);

    const { contributors, username, reponame } = useSelector(
        (state: RootState) => state.repo
    );

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenModal = async () => {
        if (contributors === undefined) {
            await dispatch(fetchRepositoryContributors({ username, reponame }));
            setIsOpen(true);
        } else setIsOpen(true);
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleOpenModal}
            >
                Contributors
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
                            <span className="text-2xl text-black">Contributors</span>
                            <ImCross onClick={handleCloseModal} className="text-gray-500" />
                        </div>
                        <hr className="my-5 border border-gray-300" />
                        <div className="px-10">
                            {contributors &&
                                contributors.map((contributor) => (
                                    <div key={contributor.login} className="flex justify-between items-center py-3 min-w-[40vw] max-w-[800px]">
                                        <a className="flex gap-10 items-center" target="_blank" href={contributor.html_url}>
                                            <img className="rounded-full w-[50px] h-[50px]" src={contributor.avatar_url} alt="user" />
                                            <span className="text-black">{contributor.login}</span>
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Contributors;
