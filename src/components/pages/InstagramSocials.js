import React, { useContext, useEffect, useState } from 'react'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import SimpleNavigationBar from '../SimpleNavigationBar';
import { useNavigate } from 'react-router-dom';

export default function InstagramSocials() {
    const navigate = useNavigate();
    const urlSearchParams = new URLSearchParams(window.location.search);

    const code = urlSearchParams.get('code');

    const { creatorId } = useContext(CreatorAuthContext);

    const handleSubmit = ()=>{
        
        fetch(`${process.env.REACT_APP_API_URL}/login_instagram/${creatorId}/${code}`)
        .then( response => response.json())
        .then(response=> {
            if(response == 'success'){
                navigate('/add_socials');
            }
        })

    }

  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />
        <div className='mt-20 mx-auto'>

        <div className='flex justify-center'>
            <img src={require('../../images/instagram.png')} className='w-36 lg:w-52' />
        </div>

        <div className='text-white capitalize text-center mt-5'>
            instagram Account Has Been Authenticated
        </div>
        <div className='flex justify-center'>
            <button className='bg-blue-600 hover:bg-blue-400 text-white hover:text-black text-sm p-2 mt-5 rounded-lg' onClick={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                Proceed...
            </button>
        </div>
        
        </div>




    </div>
  )
}
