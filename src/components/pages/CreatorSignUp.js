import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatorSignUp() {

    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [countryCode, setCountryCode] = useState("+254");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [password, setPassword] = useState(null);
    const [campaignType, setCampaignType] = useState(null);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const passwordPattern = /^(?=.*\d).{6,}$/;

        const phonePattern = /^\d{9}$/;

        if(email == null || firstName == null || lastName == null || phoneNumber == null || password == null || campaignType == null){
            toast.error('All Fields Must Be Filled', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }

        if(!emailPattern.test(email)){
            toast.error('Email must be in the correct format', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }

        if(!phonePattern.test(phoneNumber)){
            toast.error('Phone Number must be exactly 9 digits long', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }

        if(!passwordPattern.test(password)){
            toast.error('Password must be at least 6 characters long with 1 digit in it', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/create_creator_profile`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                countryCode,
                phoneNumber,
                creatorType: campaignType
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response == 'success'){
                toast.success('Success!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });

                    setTimeout(() => {
                        navigate('/creator_login');
                      }, 2000);
            }else if(response == 'user exists'){

                toast.error('Failed. Email Has Been Used!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });

            }else if(response == 'failed'){
                toast.error('Failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        })
        .catch((err)=>{
            toast.error('Failed. Server Error!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
    }
  return (
    <div className='w-full min-h-screen bg-neutral-300'>
      <div className='lg:w-2/6 mx-2 lg:mx-auto bg-white shadow-2xl items-center p-4 mb-5 mt-12 lg:mt-32 rounded'>
        <ToastContainer />
        <div className='text-center text-lg font-bold'>Hype Africa</div>
        <div className='text-center text-2xl mt-3 '>Create your Creator Account</div>

        <form className='mt-10 mx-6'>
            <div className='flex gap-2 mb-5'>
                <input type='text' className='border-2 border-gray-500 w-1/2 p-4 rounded ' onChange={e => setFirstName(e.target.value)} placeholder='First Name' required/>
                <input type='text' className='border-2 border-gray-500 w-1/2 p-4 rounded' onChange={e => setLastName(e.target.value)} placeholder='Last Name' required/>
            </div>

          <input type='text' className='border-2 border-gray-500 w-full p-4 rounded mb-5' onChange={e => setEmail(e.target.value)} placeholder='Email Address' required/>

          <div className='flex gap-2 mb-1'>

            <select className='border-2 border-gray-500 w-2/6 lg:w-1/6 p-2 rounded bg-white' onChange={e => setCountryCode(e.target.value)}>
                <option value="+254">+254</option>
                <option value="+255">+255</option>
                <option value="+256">+256</option>
            </select>

            <input type='number' className='w-4/6 lg:w-5/6 border-2 border-gray-500 p-4 rounded ' onChange={e => setPhoneNumber(e.target.value)} placeholder='Phone Number (e.g 712 345 678)' required/>

          </div>

          <div className='text-sm mb-3 text-red-900 mx-auto'>Phone number is 9 characters long and starts with a 7 or 1 e.g 707 423 443</div>
            
            <label className='text-black mt-2 mb-4'>What type of campaigns are you interested in?</label>
          <select className='border-2 border-gray-500 w-full p-4 rounded mt-2 bg-white' onChange={e => setCampaignType(e.target.value)}>
                <option value=""></option>
                <option value="influencer">Influencer Campaigns</option>
                <option value="content">Content Campaigns</option>
            </select>

          <input type='password' className='border-2 border-gray-500 w-full p-4 rounded mt-3 mb-2' onChange={e => setPassword(e.target.value)} placeholder='Password' required/>

          <div className='text-sm mb-3 text-red-900'>Email must be 6 characters long and contain at least 1 number</div>

          <Link to={"#"} className="text-sky-900 underline">Forgot Password?</Link>

          <button onClick={(e) => handleSubmit(e)} className='w-full bg-black text-white text-center text-xl p-5 mt-5 mb-5 rounded'>
            Continue
          </button>
        <div className='flex gap-1 text-lg mb-10'>
          <span className='font-bold'>I Have an Account?</span>
          <Link to={"/creator_login"} className="text-sky-900 underline">Sign In</Link>
        </div>
        </form>
      </div>
    </div>
  )
}

export default CreatorSignUp
