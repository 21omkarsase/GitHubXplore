import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../Store'
import Tags from './Tags';
import InfoButtons from './InfoButtons';

const RepoInformation = () => {
    const { username, reponame, repoInfo } = useSelector((state: RootState) => state.repo);
    return (
        <div className='col-start-9 col-span-4 flex flex-col gap-5'>
            <InfoButtons
                forks={repoInfo!.forks_count}
                watchers={repoInfo!.watchers}
                size={repoInfo!.size}
            />
            <div className='grid grid-cols-12'>
                <span className='col-span-2'>
                    Description
                </span>
                {
                    (repoInfo!.description)
                        ? <span className='col-start-4 col-span-8'>
                            {repoInfo!.description}
                        </span>
                        : <span className='col-start-4 col-span-8'>
                            Description Not Found
                        </span>
                }
            </div>

            <Tags tags={repoInfo!.topics} />

            <div className='grid grid-cols-12'>
                <span className='col-span-2'>
                    Home page
                </span>
                {
                    (repoInfo!.homepage)
                        ? <a className='col-start-4 col-span-8 text-blue-500 hover:text-blue-700 underline' href={repoInfo!.homepage} target='_blank'> {repoInfo!.homepage}</a>
                        : <span className='col-start-4 col-span-8'> Home Page Not Found</span>
                }
            </div>
        </div>
    )
}

export default RepoInformation