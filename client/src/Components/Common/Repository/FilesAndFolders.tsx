import React from 'react'

import { appendBreadCrumb } from '../../../Features/repoSlice';
import { fetchRepositoryContent } from '../../../Features/repoApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Commits from './Commits';
import Languages from './Languages';
import Contributors from './Contributors';

interface currFileStructureProps {
    username: string;
    reponame: string;
}

const FilesAndFolders: React.FC<currFileStructureProps> = ({ username, reponame }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { currFileStructure: fileStructure } = useSelector((state: RootState) => state.repo);

    const updatePathAndBreadcrumb = (name: string, path: string, type: 'dir' | 'file') => {
        dispatch(appendBreadCrumb({ name, path, type }));
        dispatch(fetchRepositoryContent({ username, reponame, currPath: { name, path, type } }));
    }

    return (
        <div className='flex justify-center max-w-[1100px] flex-col'>
            <div className="py-2 text-white bg-gray-600 grid grid-cols-2 px-5">
                <h2>{username}</h2>
                <div className="grid grid-cols-3">
                    <h2 className="col-span-1 cursor-pointer"><Commits /></h2>
                    <h2 className="col-span-1 cursor-pointer"><Languages /></h2>
                    <h2 className="col-span-1 cursor-pointer"><Contributors /> </h2>
                </div>
            </div>
            <div className="flex flex-col file-folders">
                {Array.isArray(fileStructure) ? (
                    fileStructure.map((path) => (
                        <div key={path.html_url} className="bg-gray-400 flex items-center justify-between px-6 py-3">
                            <span
                                onClick={() => {
                                    updatePathAndBreadcrumb(path.name, path.path, path.type);
                                }}
                                className="text-gray-50 cursor-pointer"
                            >
                                {path.name}
                            </span>
                        </div>
                    ))
                ) : (
                    <pre className="max-h-screen h-screen" style={{ overflowX: 'scroll' }}>
                        <SyntaxHighlighter language="javascript" style={atomDark}>
                            {fileStructure}
                        </SyntaxHighlighter>
                    </pre>
                )}
            </div>
        </div>
    );
};

export default FilesAndFolders;