import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Store'
import { Link, useParams } from 'react-router-dom'
import { fetchUserRepos } from '../../Features/reposApi'
import { changeCurrUserRepos } from '../../Features/reposSlice'
import { useNavigate } from 'react-router-dom'
import RepoCard from '../Layout/RepoCard'

const Repos: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { username } = useParams<{ username: string }>();
    const { status, currUserRepos, repos, error } = useSelector((state: RootState) => state.repos)
    useEffect(() => {
        if (username?.trim() !== "") {
            if (repos[username!] === undefined) {
                dispatch(fetchUserRepos(username!));
            } else {
                changeCurrUserRepos(username!);
            }
        } else {
            navigate("/");
        }
    }, [dispatch, username])

    return (
        <div className="container mx-auto p-4">
            <Link to="/">Home</Link>
            {status === 'pending' && <p className='flex justify-center'>Loading...</p>}
            {status === 'succeeded' && <h1 className='text-2xl font-bold mb-4'>{username} {"-->"} Repositories</h1>}
            <div className='flex justify-center flex-wrap gap-5'>
                {status === 'succeeded' && Object.values(currUserRepos!).map((repo) => (
                    <RepoCard repo={repo} />
                ))}
            </div>

            {status == 'failed' && <p className='flex justify-center'>Loading...</p>}
        </div>
    )
}

export default Repos




