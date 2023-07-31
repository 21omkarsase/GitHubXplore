import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../../../Store";
import { ImCross } from "react-icons/im"


const Issues: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { issues, username, reponame } = useSelector(
        (state: RootState) => state.repo
    );

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenModal = async () => {
        setIsOpen(true);
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleOpenModal}
            >
                Issues
            </button>
            {isOpen && (
                <motion.div
                    className={`p-4 fixed top-20 left-[25%] right-[25%] shadow-lg bg-white overflow-y-scroll`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxHeight: "80vh" }}
                >
                    <div className="flex flex-col bg-white z-51 relative">
                        <div
                            className="px-10 header flex justify-between bg-white z-50"
                        >
                            <span className="text-2xl text-black">Issues</span>
                            <ImCross onClick={handleCloseModal} className="text-gray-500" />
                        </div>
                        <hr className="my-5 border border-gray-300" />
                        <div className="px-10">
                            {issues &&
                                issues.map((issue) => (
                                    <div key={issue.html_url} className="py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 user">
                                                <img className="w-[30px] h-[30px] rounded-full" src={issue.user.avatar_url} alt="user" />
                                                <a className="self-start text-black" target="_blank" href={issue.user.html_url}>{issue.user.login}</a>
                                            </div>
                                            <p className="text-black">{issue.created_at.split("T")[0]} {" | "} {issue.created_at.split("T")[1].split("Z"[0])}</p>
                                        </div>
                                        <a target="_blank" href={issue.html_url} className="mx-10 text-black">{issue.title}</a>
                                    </div>
                                ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Issues;
