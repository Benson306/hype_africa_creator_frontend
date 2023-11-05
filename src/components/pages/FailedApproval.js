import React, { useContext } from 'react'
import SimpleNavigationBar from '../SimpleNavigationBar'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';

function FailedApproval() {

    const { logoutCreator } = useContext(CreatorAuthContext);

    const handleSignOut = () => { 
        logoutCreator();
    }

  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />
        <div className='mt-32 mx-2 lg:mx-20 bg-zinc-950 border border-gray-900 shadow-2xl p-5'>


            <div className='text-2xl text-center text-red-600 my-2 mb-5'>
              Your application to join us as a content creator has been denied.
            </div>

            <div className='text-2xl text-center text-blue-600 my-2 mb-5'>
              Re-apply Again after 3 months
            </div>

            <div className='flex justify-center mt-10 mb-10'>
                <img src={require('../../images/denied.png')} className='w-36 lg:w-52 rounded-xl' />
            </div>

            <div className='flex justify-center'>
                <button onClick={(e)=> {e.preventDefault(); handleSignOut()}} className='border-2 border-red-500 text-white text-sm p-1 lg:p-3 rounded-lg hover:bg-red-500 hover:text-white'>
                    Sign Out
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default FailedApproval
