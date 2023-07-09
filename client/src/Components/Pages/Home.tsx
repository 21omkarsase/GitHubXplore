import React from 'react'
import SearchComponent from '../Common/HomeComponents/SearchComponent'
import UserInformation from '../Common/HomeComponents/UserInformation'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store'

const Home: React.FC = () => {
    const { status, error } = useSelector((state: RootState) => state.user);

    return (
        <div className='bg-blue-50 min-h-screen'>
            <SearchComponent />
            {status === "succeeded" && <UserInformation />}
            {status === "loading" &&
                <div className="flex justify-center items-center my-10">
                    <p className="text-center text-gray-600">Loading...</p>
                </div>
            }
            {status === 'failed' && error?.errorType === 'userInfoError' &&
                <div className="flex justify-center items-center my-10">
                    <p className="text-center text-red-600">{error.message}</p>
                </div>
            }
        </div>
    )
}

export default Home