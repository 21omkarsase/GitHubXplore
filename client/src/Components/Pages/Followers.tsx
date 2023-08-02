import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchUserFollowers } from '../../Features/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import FollowFollowingContainer from '../Common/FollowFollowings/FollowFollowingContainer';
import Loading from '../Layout/Loading';

const Followers: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const { status, user, users } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (username === user.userName) {
            if (user.followersData === undefined) {
                dispatch(fetchUserFollowers(username!));
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
                    <h1 className="text-2xl font-bold mb-4">{username} {"->"} Followers</h1>
                    {status === 'succeeded' && user.followersData && <FollowFollowingContainer follows={user.followersData} />}
                </div>
            }
        </>
    )
}

export default Followers