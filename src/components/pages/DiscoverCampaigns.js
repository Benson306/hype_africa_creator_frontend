import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import SendIcon from '@mui/icons-material/Send';

function DiscoverCampaigns() {

  const { id } = useContext(CreatorAuthContext);

  const navigate =  useNavigate();

  const [data, setData] = useState([]);

  useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/get_all_campaigns`)
      .then(response => response.json())
      .then(result => {
          setData(result);
      })
      .catch(err => {
          console.log(err)
      })
  },[data])

  return (
    <div className='w-full min-h-screen bg-black'>
      <div className='p-2 ml-16 lg:ml-20'>

        <h1 className='text-xs mb-3 p-3 uppercase font-bold text-white'>Discover Campaigns</h1>

          <div className='flex flex-wrap gap-4'>
            { 
                data.length > 0 && data.map( item => 
                        
                            <Link to={`#`} className='w-full lg:w-1/4'>
                            <div class="bg-zinc-900 border border-gray-900 rounded-lg shadow-lg">
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.cover}`} class="p-0 rounded-t-lg h-44 w-full"  alt="No image Uploaded"  />
                                
        
                                <div class="px-5 pb-5">
                                    <div className='flex justify-between items-center gap-4'>
                                        <h5 class="text-md font-semibold tracking-tight text-white dark:text-white mt-2">{item.title}</h5>
                                        
                                    </div>
                                    
                                    <div className=" text-sm font-semibold mr-2 rounded text-gray-400 mb-1 mt-1 capitalize">
                                        {item.industry}
                                    </div>
                                    <i className=" text-xs font-semibold mr-2 rounded text-lime-600 mb-1 mt-1 capitalize">
                                        {item.type} Campaign
                                    </i>
                                    <br />
                                    <div class="flex items-center justify-between">
                                        <span class="text-md font-bold text-white ">$ {item.budget}</span>
                                        <Link to={`#`} class="text-white bg-blue-500 hover:bg-blue-600  font-bold rounded-xl p-2 text-center text-xs gap-2 flex items-center">
                                            <div>Pitch</div>
                                            <SendIcon fontSize='22' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                )
            }
            
            </div>

      </div>
    </div>
  )
}

export default DiscoverCampaigns
