import React from 'react'
import FollowFollowingCard from '../../Layout/FollowFollowingCard'
import { FollowFollowing } from '../../../Features/userSlice'

interface FollowersContainerProps {
  follows: FollowFollowing[]
}

const FollowFollowingContainer: React.FC<FollowersContainerProps> = ({ follows }) => {
  return (
    <div className="flex gap-5 justify-center mx-auto flex-wrap">
      {follows.map((follow) => (
        <FollowFollowingCard key={follow.login} username={follow.login} avatar={follow.avatar_url} />
      ))}
    </div>
  )
}

export default FollowFollowingContainer