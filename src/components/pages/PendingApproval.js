import React from 'react'
import SimpleNavigationBar from '../SimpleNavigationBar'

function PendingApproval() {
  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />
        <div className='mt-24 mx-2 lg:mx-20 bg-zinc-950 border border-gray-900 shadow-2xl p-5'>

          <div className='text-xl text-center my-2 font-serif tracking-wider text-blue-500'>
            You are almost there!
          </div>

            <div className='text-md text-center text-white my-2 mb-5'>
              Your Have Succesfully Completed Account Creation.
            </div>

            <div className='text-sm text-center text-white my-2'>
              Expect approval of your account within 24 hours
            </div>

            <div className='flex justify-center mt-10 mb-10'>
                <img src={require('../../images/file.gif')} className='w-36 lg:w-52 rounded-xl' />
            </div>

        </div>
    </div>
  )
}

export default PendingApproval
