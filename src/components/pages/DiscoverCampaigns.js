import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import SendIcon from '@mui/icons-material/Send';

function DiscoverCampaigns() {

  const { id } = useContext(CreatorAuthContext);

  const navigate =  useNavigate('navigate');

  const [data, setData] = useState([]);

  useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/get_campaigns/all`)
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

        <h1 className='text-sm mb-3 p-3 uppercase font-bold text-white'>Discover Campaigns</h1>

          <div className='flex flex-wrap gap-4'>
            { 
                data.length > 0 && data.map( item => {
                    if(item.status == "complete" || item.status == "scheduled"){
                        return (
                            <Link to={`#`}>
                            <div class="w-full max-w-sm bg-zinc-950 border border-gray-900 rounded-lg shadow-lg">
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.cover}`} class="p-0 rounded-t-lg h-52"  alt="No image Uploaded"  />
                                
        
                                <div class="px-5 pb-5">
                                    <div className='flex justify-between items-center gap-4'>
                                        <h5 class="text-2xl font-semibold tracking-tight text-white dark:text-white mt-2">{item.title}</h5>
                                        
                                    </div>
                                    
                                    <div className=" text-sm font-semibold mr-2 py-0.5 rounded text-gray-400 mb-1 mt-1 capitalize">
                                        {item.industry}
                                    </div>
                                    <i className=" text-sm font-semibold mr-2 py-0.5 rounded text-lime-600 mb-1 mt-1 capitalize">
                                        {item.type} Campaign
                                    </i>
                                    <br />
                                    <div class="flex items-center justify-between align-middle">
                                        <span class="text-2xl font-bold text-white ">$ {item.budget}</span>
                                        <Link to={`#`} class="text-black bg-blue-300 hover:bg-blue-400  font-bold rounded-2xl px-2 py-2.5 text-center flex align-middle text-lg gap-2">Pitch <SendIcon /></Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        )
                    }
                } )
            }
            
            </div>

      </div>
    </div>
  )
}

export default DiscoverCampaigns
