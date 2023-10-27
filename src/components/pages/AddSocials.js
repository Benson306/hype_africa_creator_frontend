import React from 'react'
import SimpleNavigationBar from '../SimpleNavigationBar'
import { useNavigate } from 'react-router-dom'

function AddSocials() {
    const navigate = useNavigate('');

    const handleClick = (type) => {
        navigate('/pending_approval')
    }

  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />

        <div className='mt-20 lg:mt-32 mx-2 lg:mx-20 text-white text-center flex justify-center text-2xl'>
                Link At least 2 of Your Social Media Accounts
        </div>

        <div className='mt-5 mx-2 lg:mx-20 flex flex-wrap justify-center mb-10'>
            <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <img src={require('../../images/instagram.png')} className='w-36 lg:w-52' />
                <button onClick={e => { 
                    e.preventDefault()
                    handleClick("instagram")
                }} className='mt-4 bg-blue-600 text-white hover:bg-blue-400 hover:text-black p-2 text-center mx-auto w-full rounded-xl'>
                    Link Account
                </button>
            </div>

            <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <img src={require('../../images/tiktok.png')} className='w-36 lg:w-52' />
                <button onClick={e => { 
                    e.preventDefault()
                    handleClick("tiktok")
                }} className='mt-4 bg-blue-600 text-white hover:bg-blue-400 hover:text-black p-2 text-center mx-auto w-full rounded-xl'>
                    Link Account
                </button>
            </div>

            <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <img src={require('../../images/facebook.png')} className='w-36 lg:w-52' />
                <button onClick={e => { 
                    e.preventDefault()
                    handleClick("facebook")
                }} className='mt-4 bg-blue-600 text-white hover:bg-blue-400 hover:text-black p-2 text-center mx-auto w-full rounded-xl'>
                    Link Account
                </button>
            </div>

        </div>
      
    </div>
  )
}

export default AddSocials
