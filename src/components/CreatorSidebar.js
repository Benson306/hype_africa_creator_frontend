import React, { useContext, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import CampaignIcon from '@mui/icons-material/Campaign';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import { CreatorAuthContext } from '../utils/CreatorAuthContext';

function CreatorSidebar() {
    
    const [isOpen, setIsOpen] = useState(false);

    const { logoutCreator } = useContext(CreatorAuthContext);

    const handleSidebar = () =>{
         
        setIsOpen(!isOpen);
    }

    const handleLogout = (e) => {
      e.preventDefault();

      logoutCreator();
    }

  return (
    // <div className='min-h-screen bg-gradient-to-l from-slate-800 via-slate-800 to-slate-900' style={{ width: isOpen ? '320px': '50px', transition: 'width 0.5s ease'}} >
    <div
      className={`min-h-screen shadow-md  bg-zinc-900 ${
        isOpen ? 'w-64' : 'w-16'
      } transition-width duration-500 ease-in-out fixed top-0 left-0 z-100 overflow-hidden`}
    >
        { isOpen && <Link onClick={handleSidebar} to={"/discover_campaigns"} >
            <h1 className='text-white text-xl text-center mt-5'>Neza</h1>
            <h2  className='text-gray-300 text-xs text-center mt-2'>Creator Dashboard</h2>
            
            </Link> }

        <MenuIcon htmlColor="#fff" sx={{ fontSize: 22 }} style={{float: 'right', marginRight: 22, marginTop: 50, marginBottom: 20}} onClick={handleSidebar}/>
        {/* <div className="mt-28" style={{marginLeft: isOpen ? '30px' : '10px', marginRight:'10px'}}> */}
        <div
        className={`mt-28 ml-4 lg:ml-${isOpen ? '12' : '8'} `}
      >
            

            <Link onClick={handleSidebar} className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 mb-3 text-sm" to={"/discover_campaigns"}>
                <CampaignIcon sx={{ fontSize: 22 }} />
                <div style={{display: isOpen ? 'block' : 'none'}}>Discover Campaigns</div> 
            </Link>
            

            <Link onClick={handleSidebar}  className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 mb-3 text-sm" to={"/discover_campaigns"}>
                <BrandingWatermarkIcon sx={{ fontSize: 20 }} />
                <div style={{display: isOpen ? 'block' : 'none'}}>Invoices</div>
            </Link>
            

            <Link onClick={handleSidebar}  className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 mb-3 text-sm" to={"/discover_campaigns"}>
                <PaidIcon sx={{ fontSize: 22 }} />
                <div style={{display: isOpen ? 'block' : 'none'}}>Wallet</div> 
            </Link>

            <button onClick={(e)=> handleLogout(e)} className='absolute bottom-10 left-0 p-4 flex  align-middle gap-4 hover:text-blue-700  text-blue-400 w-full justify-center place-items-center' >
              <LogoutIcon  sx={{ fontSize: 22 }} />
              <div className='text-sm' style={{display: isOpen ? 'block' : 'none'}}>Sign Out</div> 
            </button>
            
        </div>
    </div> 
  )
}

export default CreatorSidebar
