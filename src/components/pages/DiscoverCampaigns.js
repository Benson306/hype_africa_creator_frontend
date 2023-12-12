import React, { useContext, useEffect, useState } from 'react'
import CampaignCard from '../CampaignCard';

function DiscoverCampaigns() {

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
                        <CampaignCard item={item} />
                    )
                }
            </div>

      </div>
    </div>
  )
}

export default DiscoverCampaigns
