import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({onLogOut}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-secondary'>
            {getInitials("Lusekelo Given")}
        </div>     
        <div>
            <p className='text-sm font-medium'>Lusekelo Given</p>
            <button className='text-sm text-black underline font-bold-custom' onClick={onLogOut}> Log Out</button>
        </div>
    </div>
  )
}

export default ProfileInfo
