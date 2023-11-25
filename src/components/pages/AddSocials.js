import React, { useContext, useEffect, useState } from 'react'
import SimpleNavigationBar from '../SimpleNavigationBar'
import { Link, useNavigate } from 'react-router-dom'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AddSocials() {
    const navigate = useNavigate('');

    const { creatorId } = useContext(CreatorAuthContext);

    const  [ instagram, setInstagram] = useState(false);
    const [facebook, setFacebook ] = useState(false);
    const [tiktok, setTiktok] = useState(false);

    const [ proceed , setProceed] = useState(false);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/instagram_status/${creatorId}`)
        .then(response => response.json())
        .then(res => {
            if(res === 'success'){
                setInstagram(true);
            }
        })
    },[])

    useEffect(()=>{
        if(instagram || facebook || tiktok){
            setProceed(true);
        }

    },[instagram, tiktok, facebook])

    const handleClick = (type) => {
        //navigate('/pending_approval')
    }

  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />

        <div className='mt-16 lg:mt-10 mx-2 lg:mx-20 text-white text-center flex justify-center text-2xl'>
                Link Your Instagram Account
        </div>

        <div className='mt-5 mx-2 lg:mx-20 flex flex-wrap justify-center mb-10'>
            { 
            !instagram && <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <div className='flex justify-center'>
                    <img src={require('../../images/instagram.png')} className='w-36 lg:w-52' />
                </div>
                <div className='mt-4 bg-blue-600 text-white hover:bg-blue-400 hover:text-black p-2 text-center mx-auto w-full rounded-xl'>
                    <Link 
                        target={"_blank"} 
                        to={`https://api.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_INSTAGRAM_APP_ID}&redirect_uri=${process.env.REACT_APP_INSTAGRAM_APP_REDIRECT_URI}&scope=user_profile&response_type=code`}
                    >    
                        Link Account
                    </Link>
                </div>
                
            </div>
            }

            { 
            instagram && <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <div className='flex justify-center'>
                    <img src={require('../../images/instagram.png')} className='w-36 lg:w-52' />
                </div>
                <div className='flex align-middle gap-2 mt-4 border-2 border-green-600 text-white hover:border-green-400 hover:text-green-400 p-2 text-center mx-auto w-full rounded-xl'>
                        <CheckCircleIcon color='success' /> Instagram Account is Linked
                </div>
                
            </div>
            }

            {/* <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <div className='flex justify-center'>
                    <img src={require('../../images/tiktok.png')} className='w-36 lg:w-52' />
                </div>
                <button onClick={e => { 
                    e.preventDefault()
                    handleClick("tiktok")
                }} className='mt-4 bg-blue-600 text-white hover:bg-blue-400 hover:text-black p-2 text-center mx-auto w-full rounded-xl'>
                    Link Account
                </button>
            </div>

            <div className='bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-10 m-2 text-black'>
                <div className='flex justify-center'>
                    <img src={require('../../images/facebook.png')} className='w-36 lg:w-52' />
                </div>
                <button onClick={e => { 
                    e.preventDefault()
                    handleClick("facebook")
                }} className='mt-4 bg-blue-600 text-white hover:bg-blue-400 hover:text-black p-2 text-center mx-auto w-full rounded-xl'>
                    Link Account
                </button>
            </div> */}

        </div>

        { proceed && <div className='flex justify-end'>
            <button className='mt-4 bg-green-600 text-white hover:bg-green-400 hover:text-black p-2 text-center mx-auto rounded-xl shadow-lg'>
                Proceed
            </button>

        </div> }
      
    </div>
  )
}

export default AddSocials
