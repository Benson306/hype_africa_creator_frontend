import React from 'react'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

function CampaignCard({ item }) {

    const [modalOpen, setModalOpen] = useState(false);
    
    const [newItem, setNewItem] = useState(null);

    const openModal = () => {
        setNewItem(item)
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const [pitch, setPitch] = useState(false);

  return (
    <div className='w-full lg:w-1/4'>
        <Link to={`#`}  onClick={() => {
            openModal()
            }}>
            <div class="bg-zinc-900 border border-gray-900 rounded-lg shadow-lg">
                <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.cover}`} class="p-0 rounded-t-lg h-44 w-full"  alt="No image Uploaded"  />
                

                <div class="px-5 pb-5">
                    <div className='flex justify-between items-center gap-4'>
                        <h5 class="text-sm font-semibold tracking-tight text-white dark:text-white mt-1">{item.title}</h5>
                        
                    </div>
                    
                    <div className=" text-sm font-semibold mr-2 rounded text-gray-400 mt-1 capitalize">
                        {item.industry}
                    </div>
                    <i className=" text-xs font-semibold mr-2 rounded text-lime-600 mt-1 capitalize">
                        {item.type} Campaign
                    </i>
                    <br />
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-sm font-bold text-white ">$ {item.budget}</span>
                        {/* <Link to={`#`} class="text-white bg-blue-500 hover:bg-blue-600  font-bold rounded-xl p-2 text-center text-xs gap-2 flex items-center">
                            <div>Pitch</div>
                            <SendIcon fontSize='22' />
                        </Link> */}
                    </div>
                </div>
            </div>
        </Link>

        { modalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-80">

            <div className="bg-black rounded-lg shadow-lg lg:w-1/2">
                <div 
                className='lg:mb-5'
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${item.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '150px', // Set the height of the div as needed
                    width: '100%',
                    borderRadius:'5px'
                }}      
                >
                    <div className='flex justify-end'>
                        <button
                            onClick={() => {
                                closeModal();
                                setPitch(false);
                            }}
                            className="absolute mr-2 mt-2 text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full text-xs "
                        >
                            X
                        </button>
                    </div>

                    <div className="px-2 py-1 text-xs mt-24" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' , color: 'rgba(255, 255, 255, 1)' }}> 
                        <div className='text-xl mt-1'>{newItem.title}</div>
                        <div className='text-md text-blue-400'>{newItem.industry}</div>
                    </div>
                </div>

                { 
                !pitch ? 
                <div className='w-full flex gap-4 p-4'>
                    <div>
                        <div className='text-sm mt-1 text-lime-400'>Objective</div>
                        <div className='text-xs  mt-1 text-white'>{newItem.objective}</div>

                        <div className='text-sm mt-1 text-lime-400'>Call To Action</div>
                        <div className='text-xs  mt-1 text-white'>{newItem.call_to_action}</div>

                        <div className='text-sm mt-1 text-lime-400'>Start Date</div>
                        <div className='text-xs  mt-1 text-white'>{newItem.startDate}</div>

                        <div className='text-sm mt-1 text-lime-400'>End Date</div>
                        <div className='text-xs  mt-1 text-white'>{newItem.endDate}</div>

                        <div className='text-sm mt-1 text-lime-400'>Number of Days</div>
                        <div className='text-xs  mt-1 text-white'>{newItem.numberOfDays}</div>

                        <div className='text-sm mt-1 text-lime-400'>Budget</div>
                        <div className='text-xs  mt-1 text-white'>Ksh. {newItem.budget}</div>

                        <div className='text-sm mt-1 text-lime-400'>Gender of content creators</div>
                        <div className='text-xs  mt-1 text-white capitalize'>{newItem.gender}</div>
                    </div>

                    <div>
                        <div className='text-sm mt-1 text-lime-400'>Do's</div>
                        <div className='text-xs mt-1 text-white'>{newItem.dos}</div>

                        <div className='text-sm mt-1 text-lime-400'>Dont's</div>
                        <div className='text-xs text-white'>{newItem.donts}</div>

                        <div className='text-sm mt-1 text-lime-400'>Tags to be used:</div>
                        <div className='flex items-center gap-2 align-middle'>
                            <div className='text-white text-xs'>X :</div>
                            <div className='text-xs text-white'>{newItem.xTags}</div>
                        </div>

                        <div className='flex items-center gap-2 align-middle'>
                            <div className='text-white text-xs'>Instagram :</div>
                            <div className='text-xs text-white'>{newItem.instagramTags}</div>
                        </div>

                        <div className='flex items-center gap-2 align-middle'>
                            <div className='text-white text-xs'>Facebook :</div>
                            <div className='text-xs text-white'>{newItem.fbTags}</div>
                        </div>
                        

                        <div className='text-sm mt-1 text-lime-400'>Followers Needed:</div>
                        <div className='flex items-center gap-2 align-middle'>
                            <div className='text-white text-xs'>Instagram :</div>
                            <div className='text-xs text-white'>{newItem.instaFollowers}</div>
                        </div>

                        <div className='flex items-center gap-2 align-middle'>
                            <div className='text-white text-xs'>X :</div>
                            <div className='text-xs text-white'>{newItem.xFollowers}</div>
                        </div>

                        <div className='flex items-center gap-2 align-middle'>
                            <div className='text-white text-xs'>Facebook :</div>
                            <div className='text-xs text-white'>{newItem.fbFollowers}</div>
                        </div>

                        <div className='text-sm mt-1 text-lime-400'>End Date</div>
                        <div className='text-xs mt-1 text-white'>{newItem.endDate}</div>

                        <div className='text-sm mt-1 text-lime-400'>Location of content creator</div>
                        <div className='text-xs mt-1 text-white capitalize'>{newItem.location}</div>
                    </div>
                    
                </div> 
                :
                <div className='w-full p-4 mx-auto'>
                    <form>
                        <label className="text-lime-600 text-sm">How best can you deliver this campaign:</label>
                        <br />
                        <textarea className='p-2 rounded-lg bg-zinc-900 w-full mt-2 text-white text-xs' rows={5}></textarea>
                    </form>
                
                </div>
                
            }

                { 
                pitch ? 
                <div className="flex justify-center">
                    <button className='flex gap-2  justify-center items-center p-2 text-sm bg-lime-800 hover:bg-lime-600 text-white rounded-lg mb-4 w-full mx-44'>
                        <div>Send Pitch</div>
                        <SendIcon fontSize='22' />
                    </button>
                </div> 
                :
                <div className="flex justify-center">
                    <button className='flex gap-2  justify-center items-center p-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg mb-4 w-full mx-44' onClick={()=> setPitch(true)}>
                        <div>Pitch</div>
                        <SendIcon fontSize='22' />
                    </button>
                </div>
            }
            </div>
            </div>
        )}
    </div>
    
  )
}

export default CampaignCard