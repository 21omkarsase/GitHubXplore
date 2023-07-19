import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { isAxiosError } from '../../Features/userApi';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FilesAndFolders from '../Common/Repository/FilesAndFolders';



export interface FileStructure {
    name: string;
    path: string;
    url: string;
    html_url: string;
    type: 'dir' | 'file';
    [key: string]: string;
}

const Repo: React.FC = () => {

    const { username, reponame } = useParams<{ username: string, reponame: string }>();

    const [currPath, setCurrPath] = useState<{ name: string, path: string, type: 'dir' | 'file' }>({ name: reponame!, path: "", type: 'dir' });
    const [breadCrumb, setBreadCrumb] = useState<{ name: string, path: string, type: 'dir' | 'file' }[]>([{ name: reponame!, path: "", type: 'dir' }]);

    const [currFileStructure, setCurrFileStructure] = useState<FileStructure[] | string>([]);
    const [language, setLanguage] = useState<string>("javascript");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const updateCurrPath = (name: string, path: string, type: 'dir' | 'file') => {
        setCurrPath({ name, path, type });
    }

    const appendBreadCrumb = (name: string, path: string, type: 'dir' | 'file') => {
        setBreadCrumb((prevState) => [...prevState, { name, path, type }]);
        updateCurrPath(name, path, type);
    }

    const sliceBreadCrumb = (idx: number, name: string, path: string, type: 'dir' | 'file') => {
        setBreadCrumb(breadCrumb.slice(0, idx + 1));
        updateCurrPath(name, path, type);
    }


    useEffect(() => {
        const fetchFileStructure = async () => {
            try {
                setLoading(true);
                const config = {
                    method: 'post',
                    url: 'http://localhost:5000/repo/file-structure',
                    data: {
                        username,
                        reponame,
                        path: currPath.path,
                        type: currPath.type
                    },
                    "Content-Type": "application/json"
                }

                const { data } = await axios(config);

                const pathSplit = currPath.path.split(".");

                setCurrFileStructure(data.fileStructure);
                setLanguage(pathSplit[pathSplit.length - 1])


                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (isAxiosError(error)) {
                    if (error.response)
                        setError((error.response.data as any).message);

                    if (error.request) {
                        setError("Check your internet connection and try again");
                    }

                    setError("Internal Server Error");
                } else
                    setError("Internal Server Error");
            }
        }
        fetchFileStructure();
    }, [currPath])

    return (
        <div className="container mx-auto p-4">
            <Link to="/"> <h1 className='text-2xl'>Home</h1></Link>
            <nav className="text-sm py-5">
                <ol className="list-none p-0 inline-flex">
                    {breadCrumb.map((navLink, idx) => (
                        <li className="flex items-center">
                            <span onClick={(() => sliceBreadCrumb(idx, navLink.name, navLink.path, navLink.type))} className="cursor-pointer text-blue-500">
                                {navLink.name}
                            </span>
                            <span className="mx-2">/</span>
                        </li>
                    ))}
                </ol>
            </nav>

            {loading && <p>Loading...</p>}
            {!error && !loading && Array.isArray(currFileStructure) &&
                <FilesAndFolders addValueToBreadcrumb={appendBreadCrumb} fileStructure={currFileStructure} />
            }
            {!error && !loading && !Array.isArray(currFileStructure) &&
                <pre className='max-h-screen h-screen' style={{ overflowX: 'scroll' }}>
                    <SyntaxHighlighter language={language} style={atomDark}>
                        {currFileStructure}
                    </SyntaxHighlighter>
                </pre>}
            {!loading && error && <p>{error}</p>}
        </div>
    )
}

export default Repo