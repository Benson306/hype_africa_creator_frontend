import React from 'react'
import SimpleNavigationBar from '../SimpleNavigationBar'

function AddSocials() {
  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />

        <div className='mt-32 mx-2 lg:mx-20 text-white flex justify-center text-2xl'>
                Add Social Media Accounts
        </div>

        <div className='mt-5 mx-2 lg:mx-20 flex flex-wrap justify-center'>
            <div className='bg-neutral-400 shadow-2xl rounded-lg p-10 m-2 text-black'>
                Add Insagram
            </div>

            <div className='bg-neutral-400 shadow-2xl rounded-lg p-10 m-2 text-black'>
                Add Insagram
            </div>

            <div className='bg-neutral-400 shadow-2xl rounded-lg p-10 m-2 text-black'>
                Add Insagram
            </div>

        </div>
      
    </div>
  )
}

export default AddSocials
