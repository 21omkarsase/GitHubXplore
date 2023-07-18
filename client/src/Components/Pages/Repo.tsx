import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { isAxiosError } from '../../Features/userApi';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



interface FileStructure {
    name: string;
    path: string;
    url: string;
    html_url: string;
    type: 'dir' | 'file';
    [key: string]: string;
}

type FileStructureType = FileStructure[];
const Repo: React.FC = () => {

    const [currPath, setCurrPath] = useState<{ type: 'dir' | 'file', path: string }>({ type: 'dir', path: '' });
    const [currFileStructure, setCurrFileStructure] = useState<FileStructureType | string>([]);
    const { username, reponame } = useParams<{ username: string, reponame: string }>();
    const [language, setLanguage] = useState<string>("javascript");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateCurrPath = (path: string, type: 'dir' | 'file') => {
        setCurrPath({ type, path });
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
            <Link to="/"> Home</Link>
            <h1 className="text-2xl font-bold mb-4">{username} {"->"} Repositories  {"->"} {reponame}</h1>

            {loading && <p>Loading...</p>}
            {!loading && Array.isArray(currFileStructure) &&
                (currFileStructure.map((path) => (
                    <div key={path.url} onClick={(() => {
                        updateCurrPath(path.path, path.type);
                    })} >{path.name}</div>
                )))
            }
            {!loading && !Array.isArray(currFileStructure) &&
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