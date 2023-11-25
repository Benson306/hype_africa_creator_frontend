import React, { useContext, useEffect, useState } from 'react'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import SimpleNavigationBar from '../SimpleNavigationBar';

function SelectIndustries() {

    const { creatorId } = useContext(CreatorAuthContext);

    const [industries, setIndustries] = useState([]);

    const [newIndustry, setNewIndustry] = useState('');

    useEffect(()=>{
        if(newIndustry.length > 0){
            if (!industries.includes(newIndustry)) {
                setIndustries([...industries, newIndustry]);
            }
            
        }
    },[newIndustry])

    const deleteIndustryByIndex = (e, index) => {
        e.preventDefault();

        if (index >= 0 && index < industries.length) {
            const updatedIndustries = industries.filter((_, i) => i !== index);
            setIndustries(updatedIndustries);
        }
    }

    const navigate = useNavigate();

    const handleSubmit = () => {
        if(industries.length < 1){
            toast.error('Select at least 1 industry', {
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

        fetch(`${process.env.REACT_APP_API_URL}/update_industries`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                id: creatorId,
                industries
            })
        })
        .then((data)=> data.json())
        .then(data => {
            if(data.status == 'success'){
                    navigate("/set_earning")
            }else{
                toast.error('Failed. Server Error', {
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
    }

  return (
    <div className='w-full min-h-screen bg-black'>
        <SimpleNavigationBar />

        <div className='mt-52 mx-2 lg:mx-20'>
            <form className='mx-2 lg:mx-32'>
                <ToastContainer />

                <label className='text-white text-lg lg:text-xl mb-5 lg:mb-2 lg:flex lg:text-center'>
                    Select Industries You Want To Create Content For:
                </label>
                <div class="relative mt-8">
                    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={e => setNewIndustry(e.target.value)}>
                        <option value="">Select Industry .....</option>
                        <option value="Arts and Entertainment">Arts and Entertainment</option>
                        <option value="Books and Literature">Books and Literature</option>
                        <option value="Health">Health</option>
                        <option value="Computers Electronics and Technology">Computers Electronics and Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Food and Drink">Food and Drink</option>
                        <option value="Travel and Tourism">Travel and Tourism</option>
                        <option value="Pets and Animals">Pets and Animals</option>
                        <option value="Sports">Sports</option>
                        <option value="Home and Garden">Home and Garden</option>
                    </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>

            <div>
            {
                industries.length > 0 &&
                <div className='flex flex-wrap mt-10 mx-2 lg:mx-32'>
                    {
                        industries.map((industry, index) => (
                            <div className='text-white p-2 border-2 border-white rounded-xl mx-2 my-2 flex gap-4  items-center place-content-center text-sm'>
                                <div>
                                 {industry} 
                                </div>
                                <button onClick={(e)=> deleteIndustryByIndex(e, index)} className='text-red-800 font-bold text-2xl'>
                                    X
                                </button>
                            
                            </div>
                        ))
                    }
                </div>
            }

            </div>

            <div className='flex justify-center lg:justify-end mt-5 mb-20'>
                <button onClick={(e)=>{
                 e.preventDefault();
                 handleSubmit()   
                }} 
                className='mr-10 bg-blue-700 text-white rounded-xl shadow-lg hover:bg-blue-300 hover:text-black p-2 w-32 lg:w-20'>
                    Next
                </button>

            </div>

            </form>

        </div>
      
    </div>
  )
}

export default SelectIndustries
