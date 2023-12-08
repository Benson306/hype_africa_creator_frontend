import React, { useContext } from 'react'
import { CreatorAuthContext } from '../utils/CreatorAuthContext';

function SimpleNavigationBar() {

    const { logoutCreator } = useContext(CreatorAuthContext);

    const handleSignOut = () => { 
        logoutCreator();
    }
  return (
    <div className='bg-neutral-900 shadow-lg p-2'>
      <div className='flex align-middle justify-between mx-2 lg:mx-10'>
        <div className='text-white text-md lg:text-xl'>
            Neza
        </div>

        <button onClick={(e)=> {e.preventDefault(); handleSignOut()}} className='text-red-500 text-sm p-1 lg:p-2 rounded-lg hover:bg-red-500 hover:text-white'>
            Sign Out
        </button>
      </div>
    </div>
  )
}

export default SimpleNavigationBar
