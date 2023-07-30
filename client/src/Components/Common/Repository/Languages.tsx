import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../../../Store";
import { fetchRepositoryLanguages } from "../../../Features/repoApi";
import { ImCross } from "react-icons/im"


const Languages: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);

    const { languages, username, reponame } = useSelector(
        (state: RootState) => state.repo
    );

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenModal = async () => {
        if (languages === undefined) {
            await dispatch(fetchRepositoryLanguages({ username, reponame }));
            setIsOpen(true);
        } else setIsOpen(true);
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleOpenModal}
            >
                Languages
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
                            className="px-10 header flex justify-between gap-10 items-center bg-white z-50"
                        >
                            <span className="text-2xl text-black">Languages</span>
                            <ImCross onClick={handleCloseModal} className="text-gray-500" />
                        </div>
                        <hr className="my-5 border border-gray-300" />
                        <div className="px-10">
                            {languages &&
                                Object.entries(languages).map(([key, value], idx) => (
                                    <div key={idx} className="flex justify-between items-center py-3 min-w-[40vw] max-w-[800px]">
                                        <span className="text-black">{key}</span> <span> </span>
                                        <span className="text-black">{value}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Languages;
