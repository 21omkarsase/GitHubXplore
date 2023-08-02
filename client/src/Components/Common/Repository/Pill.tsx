import React from 'react'

interface PillProps {
    tag: string;
}
const Pill: React.FC<PillProps> = ({ tag }) => {
    return (
        <span className='px-3 py-1 bg-blue-400 rounded-xl'>{tag}</span>
    )
}

export default Pill