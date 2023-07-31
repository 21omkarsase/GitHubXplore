import React from 'react'

import { appendBreadCrumb } from '../../../Features/repoSlice';
import { fetchRepositoryContent } from '../../../Features/repoApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Commits from './Commits';
import Issues from './Issues';

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
        <div className='col-span-7'>
            <div className="py-2 text-white bg-gray-600 flex items-center justify-between px-5">
                <h2>{username}</h2>
                <div className="flex gap-3">
                    <h2 className="col-span-1 cursor-pointer"><Issues /></h2>
                    <h2 className="col-span-1 cursor-pointer"><Commits /></h2>
                </div>
            </div>
            <div>
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
                    <pre className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 max-h-screen " style={{ overflowY: 'scroll' }}>
                        <SyntaxHighlighter language="javascript" style={atomDark}>
                            {fileStructure}
                        </SyntaxHighlighter>
                    </pre>
                )}
            </div>
        </div >
    );
};

export default FilesAndFolders;