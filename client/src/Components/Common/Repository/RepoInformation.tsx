import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Store'
import Tags from './Tags';
import InfoButtons from './InfoButtons';
import Pill from './Pill';

const RepoInformation = () => {
    const { repoInfo, languages, contributors } = useSelector((state: RootState) => state.repo);
    return (
        <div className='col-start-9 col-span-4 mb-5'>
            <InfoButtons
                forks={repoInfo!.forks_count}
                watchers={repoInfo!.watchers}
                size={repoInfo!.size}
            />
            <div className='grid grid-cols-12 my-10'>
                <span className='col-span-2 font-bold'>
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

            <div className='grid grid-cols-12 my-10'>
                <span className='col-span-3 font-bold'>
                    Home page
                </span>
                {
                    (repoInfo!.homepage)
                        ? <a className='col-start-4 col-span-8 text-blue-500 hover:text-blue-700 underline' href={repoInfo!.homepage} target='_blank'> {repoInfo!.homepage}</a>
                        : <span className='col-start-4 col-span-8'> Home Page Not Found</span>
                }
            </div>

            {languages &&
                <div className='grid grid-cols-12 my-10'>
                    <span className='col-span-3 font-bold'>
                        Languages
                    </span>
                    <div className='flex gap-2'>
                        {
                            languages &&
                            Object.entries(languages).map(([key, value], idx) => (
                                <Pill tag={key} />
                            ))
                        }
                    </div>
                </div>
            }

            {contributors &&
                <div className='grid grid-cols-12 my-10'>
                    <span className='col-span-3 font-bold'>
                        Contributors
                    </span>
                    <div className='col-start-4 col-span-8 flex flex-wrap gap-5'> {
                        contributors.map((contributor) => (
                            <a key={contributor.login} className="grid-cols-12 flex items-center gap-1" target="_blank" href={contributor.html_url}>
                                <img className=" rounded-full w-[30px] h-[30px]" src={contributor.avatar_url} alt="user" />
                                <Pill tag={contributor.login} />
                            </a>
                        ))
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default RepoInformation