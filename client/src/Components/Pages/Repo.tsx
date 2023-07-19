import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FilesAndFolders from '../Common/Repository/FilesAndFolders';

import { Path, clearAndAppendBreadCrumb, sliceBreadCrumb } from '../../Features/repoSlice';

import { fetchRepositoryContent } from '../../Features/repoApi';
import { AppDispatch, RootState } from '../../Store';

const Repo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { username, reponame } = useParams<{ username: string, reponame: string }>();
    const { breadCrumb, loading, error } = useSelector((state: RootState) => state.repo);

    useEffect(() => {
        dispatch(clearAndAppendBreadCrumb({ name: reponame!, path: '', type: 'dir' }))
        if (username && reponame)
            dispatch(fetchRepositoryContent({ username, reponame, currPath: { name: reponame!, path: '', type: 'dir' } }));
    }, [])

    const handlePathChange = (idx: number, path: Path) => {
        dispatch(sliceBreadCrumb({ idx, path: path }));
        if (username && reponame)
            dispatch(fetchRepositoryContent({ username, reponame, currPath: path }));
    }

    return (
        <div className="container mx-auto p-4">
            <Link to="/">
                <h1 className='text-2xl'>Home</h1>
            </Link>
            <nav className="text-sm py-5">
                <ol className="list-none p-0 inline-flex">
                    {breadCrumb.map((navLink, idx) => (
                        <li className="flex items-center">
                            <span onClick={(() => handlePathChange(idx, navLink))} className="cursor-pointer text-blue-500">
                                {navLink.name}
                            </span>
                            <span className="mx-2">/</span>
                        </li>
                    ))}
                </ol>
            </nav>
            {loading.status === true && loading.type === 'filesLoading' && <p>Loading...</p>}
            {loading.status === false && error.message === null && <FilesAndFolders reponame={reponame!} username={username!} />}
            {!loading.status && error.message === null && <p>{error.message}</p>}
        </div >
    )
}

export default Repo