import React, { useContext } from 'react'
import { CreatorAuthContext } from '../utils/CreatorAuthContext';

function SimpleNavigationBar() {

    const { logoutCreator } = useContext(CreatorAuthContext);

    const handleSignOut = () => { 
        logoutCreator();
    }
  return (
    <div className='bg-neutral-900 shadow-lg p-4'>
      <div className='flex align-middle justify-between mx-2 lg:mx-10'>
        <div className='text-white text-lg lg:text-2xl'>
            Hype Africa
        </div>

        <button onClick={(e)=> {e.preventDefault(); handleSignOut()}} className='border-2 border-red-500 text-white text-sm p-1 lg:p-3 rounded-lg'>
            Sign Out
        </button>
      </div>
    </div>
  )
}

export default SimpleNavigationBar
