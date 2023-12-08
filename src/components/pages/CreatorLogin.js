import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatorLogin() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const  { addCreatorId } = useContext(CreatorAuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email == null || password == null){
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

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const passwordPattern = /^(?=.*\d).{6,}$/;

      if(!emailPattern.test(email)){
        toast.error('Email must be in the correct format', {
            position: "top-right",
            autoClose: 2000,
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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/creator_login`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(response => {
        if(response.status == "success"){
          toast.success('Success!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
          
          if(response.industryCount > 0){
                setTimeout(() => {
                  addCreatorId(response.uid);

                  if(response.averageEarning > 1000){
                      if(response.isComplete){
                        if(response.isApproved == 1){
                          navigate('/discover_campaigns');
                        }else if(response.isApproved == 0){
                          navigate('/pending_approval');
                        }else if(response.isApproved == 2){
                          navigate('/failed_approval');
                        }
                      }else{
                        if(response.creatorType == 'influencer'){
                          navigate('/add_socials');
                        }else if(response.creatorType == 'content'){
                          navigate('/add_media');
                        }
                      } 
                  }else{
                    navigate('/set_earning');
                  }

                  
                }, 1000);
          }else{
              setTimeout(() => {
                addCreatorId(response.uid);
                navigate('/select_industry');
              }, 1000);
          }
          
        }else if(response.status == "failed"){
          
            toast.error('Authentication Failed', {
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
        toast.error('Authentication Failed', {
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
      <div className='lg:w-2/6 mx-2 lg:mx-auto bg-white shadow-2xl items-center p-4 mt-32 lg:mt-32 rounded'>
        <ToastContainer />
        <div className='text-center text-lg font-bold'>Neza</div>
        <div className='text-center text-xl mt-3 '>Welcome Back!</div>

        <form className='mt-5 mx-6'>
          <input type='text' className='border-2 border-gray-500 w-full p-3 text-xs rounded' onChange={e => setEmail(e.target.value)} placeholder='Email Address' required/>
          <input type='password' className='border-2 border-gray-500 w-full p-3 text-xs rounded mt-5 mb-3' onChange={e => setPassword(e.target.value)} placeholder='Password' required/>

          <Link to={"#"} className="text-sky-900 text-xs underline">Forgot Password?</Link>

          <button onClick={e => handleSubmit(e)} className='w-full bg-black text-white text-center text-xl p-2 mt-3 mb-5 rounded'>
            Continue
          </button>
        <div className='flex gap-2 text-xs mb-10'>
          <span className='font-bold'>Don't Have an Account?</span>
          <Link to={"/creator_signup"} className="text-sky-900 underline">Sign Up</Link>
        </div>
        </form>
      </div>
    </div>
  )
}

export default CreatorLogin
