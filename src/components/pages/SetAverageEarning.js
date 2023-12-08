import React, { useContext, useEffect, useState } from 'react'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SimpleNavigationBar from '../SimpleNavigationBar';

function SetAverageEarning() {

    const { creatorId } = useContext(CreatorAuthContext);

    const navigate = useNavigate();

    // Define minimum and maximum values
    const minValue = 1000;
    const maxValue = 20000;

    const [rangeValue, setRangeValue] = useState(1000);

    // Event handler for the range input change
    const handleRangeChange = (event) => {
        const newValue = event.target.value;
        setRangeValue(newValue);
    };

    const handleSubmit = () => {
        if(rangeValue < 999){
            toast.error('Average earning should be more than 1000 Ksh', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/update_average_earning`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id: creatorId,
                averageEarning: rangeValue
            })
        })
        .then((data)=> data.json())
        .then(data => {
            if(data.status == 'success'){
                if(data.creatorType == 'content'){
                    navigate("/add_media")
                }else if(data.creatorType == 'influencer'){
                    navigate("/add_socials")
                }
            }else{
                toast.error('Failed. Server Error', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                }
        })
    }

  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />

        <div className='mt-52 mx-2 lg:mx-20'>
            <form className='mx-2 lg:mx-32'>
                <ToastContainer />

                <label className='text-white text-lg lg:text-lg mb-5 lg:mb-2 lg:flex lg:text-center'>
                    Set your expected average earning per campaign:
                </label>

                <div class="w-full md:w-1/3 mb-6 mt-3">
                    <input
                        type="range"
                        class="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
                        id="customRange1" 
                        value={rangeValue}
                        min={minValue}
                        max={maxValue}
                        step={100}
                        onChange={handleRangeChange}
                    />

                    <p className='text-white mt-10 text-sm'>Amount: Ksh.<b> {rangeValue}</b></p>
                </div>
            

                <div className='flex justify-center lg:justify-end mt-5 mb-20'>
                    <button onClick={(e)=>{
                    e.preventDefault();
                    handleSubmit()   
                    }} 
                    className='mr-10 bg-blue-700 text-white text-sm rounded-xl shadow-lg hover:bg-blue-300 hover:text-black p-2 w-32 lg:w-20'>
                        Next
                    </button>

                </div>

            </form>

        </div>
      
    </div>
  )
}

export default SetAverageEarning
