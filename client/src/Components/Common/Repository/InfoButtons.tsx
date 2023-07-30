import React from 'react'
import { BiGitRepoForked } from "react-icons/bi"
import { AiFillFileAdd, AiOutlineEye } from "react-icons/ai"

interface InfoButtonsProps {
    forks: number;
    watchers: number;
    size: number;
}

const InfoButtons: React.FC<InfoButtonsProps> = ({ forks, watchers, size }) => {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-3 px-3 py-1 bg-blue-400 flex justify-between gap-1 rounded-md items-center'>
                <span><AiOutlineEye /></span>
                <span>Watchers</span>
                <span>{watchers}</span>
            </div>
            <div className='col-start-5 col-span-3 px-3 py-1 bg-blue-400 flex justify-between gap-1 rounded-md items-center'>
                <span><BiGitRepoForked /></span>
                <span>Forks</span>
                <span>{forks}</span>
            </div>
            <div className='col-start-9 col-span-3 px-3 py-1 bg-blue-400 flex justify-between gap-1 rounded-md items-center'>
                <span><AiFillFileAdd /></span>
                <span>Size</span>
                <span>{size}</span>
            </div>
        </div>
    )
}

export default InfoButtons