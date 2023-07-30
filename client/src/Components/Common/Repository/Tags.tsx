import React from 'react'
interface TagsProps {
    tags: string[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className='grid grid-cols-12'>
            <span className='col-2'>tags</span>
            {
                tags.length > 0 ? (
                    <div className='col-start-4 flex gap-2 flex-wrap col-span-8'>
                        {tags.map((tag, idx) => (
                            <span className='px-3 py-1 bg-blue-400 rounded-xl' key={idx}>{tag}</span>
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