import React from 'react'
import { motion } from 'framer-motion'

interface InformationTextProps {
    property: string;
    value: string;
}

const InformationText: React.FC<InformationTextProps> = ({ property, value }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            <h1>
                <motion.span className=''
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {property} :
                </motion.span>{" "}
                <motion.span className=''
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {value}
                </motion.span>
            </h1>
        </motion.div>
    )
}

export default InformationText