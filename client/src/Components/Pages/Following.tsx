import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchUserFollowing } from '../../Features/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import FollowFollowingContainer from '../Common/FollowFollowings/FollowFollowingContainer';
import Loading from '../Layout/Loading';

const Following: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { status, user } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (username === user.userName) {
            if (user.followingData === undefined) {
                dispatch(fetchUserFollowing(username!));
            }
        }
        else {
            navigate("/");
        }
    }, [dispatch, username])

    return (
        <>
            {status === 'loading' ? <Loading /> :
                <div className="container mx-auto p-4">
                    <Link to="/"> Home</Link>
                    <h1 className="text-2xl font-bold mb-4">{username} {"->"} Followings</h1>
                    {status === 'succeeded' && user.followingData && <FollowFollowingContainer follows={user.followingData} />}
                </div>
            }
        </>
    )
}

export default Following