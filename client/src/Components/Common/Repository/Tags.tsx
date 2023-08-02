import React from 'react'
import Pill from './Pill';
interface TagsProps {
    tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className='grid grid-cols-12 my-10'>
            <span className='col-2 font-bold'>Tags</span>
            {
                tags.length > 0 ? (
                    <div className='col-start-4 flex gap-2 flex-wrap col-span-8'>
                        {tags.map((tag, idx) => (
                            <Pill tag={tag} key={idx} />
                        ))}
                    </div>
                ) : (
                    <span className='col-start-4 col-span-8'>Tags Not Found</span>
                )
            }
        </div>
    )
}

export default Tags