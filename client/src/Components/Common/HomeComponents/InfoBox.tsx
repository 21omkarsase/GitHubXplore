import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

interface InfoBoxProps {
    property: string;
    value: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ property, value }) => {
    return (
        <Link to={`/${property}`} >
            <motion.div
                className="flex justify-between items-center px-5 w-40 h-20 bg-blue-500 rounded-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span>
                    {property}
                </motion.span>
                <motion.div
                    className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-white font-bold">{value}</span>
                </motion.div>
            </motion.div>
        </Link>
    );
}

export default InfoBox