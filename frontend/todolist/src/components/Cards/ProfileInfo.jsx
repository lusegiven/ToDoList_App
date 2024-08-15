import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogOut}) => {
  if (!userInfo) {
    return null; 
  }
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-secondary'>
            {getInitials(userInfo.fullName)}
        </div>     
        <div>
            <p className='text-sm font-medium'>{userInfo.fullName}</p>
            <button className='text-sm text-black underline font-bold-custom' onClick={onLogOut}> Log Out</button>
        </div>
    </div>
  )
}

export default ProfileInfo
