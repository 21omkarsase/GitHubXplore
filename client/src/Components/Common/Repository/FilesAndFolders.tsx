import React from 'react'

import { FileStructure } from '../../Pages/Repo';

interface currFileStructureProps {
    fileStructure: FileStructure[];
    addValueToBreadcrumb: (name: string, path: string, type: 'dir' | 'file') => void;
}

const FilesAndFolders: React.FC<currFileStructureProps> = ({ fileStructure, addValueToBreadcrumb }) => {
    return (
        <div className='flex justify-center max-w-[1100px] flex-col'>
            <div className="py-2 text-white bg-gray-600 grid grid-cols-2 px-5">
                <h2>Username</h2>
                <div className="grid grid-cols-3">
                    <h2 className="col-span-1 cursor-pointer">Commits</h2>
                    <h2 className="col-span-1 cursor-pointer">Languages</h2>
                    <h2 className="col-span-1 cursor-pointer">Contributors</h2>
                </div>
            </div>
            <div className="flex flex-col file-folders">
                {
                    (fileStructure.map((path) => (
                        <div className='bg-gray-400 flex items-center justify-between px-6 py-3' key={path.url}>
                            <span onClick={(() => {
                                addValueToBreadcrumb(path.name, path.path, path.type)
                            })} className="text-gray-50 cursor-pointer ">
                                {path.name}
                            </span>
                        </div>
                    )))
                }
            </div>
        </div >
    )
}

export default FilesAndFolders