import React, { useContext, useEffect, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import CampaignIcon from '@mui/icons-material/Campaign';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import PaidIcon from '@mui/icons-material/Paid';
import { AuthContext } from '../utils/AuthContext';
import Select from 'react-select';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

function RightSidebar() {
    const sidebarCampaignItems =[
        {
            label:'Active Campaigns',
            //icon: <ActiveCampaigns />,
            route: '/active_campaigns'
        },
        {
            label:'Scheduled Campaigns',
            //icon: <ScheduledCampaigns />,
            route: '/scheduled_campaigns'
        },
        {
            label:'Completed Campaigns',
            //icon: <CompletedCampaigns />,
            route: '/completed_campaigns'
        },
        {
            label:'Drafts',
            //icon: <Drafts />,
            route: '/draft_campaigns'
        }

    ]

    const sidebarBrandItems = [
        {
            label:'All Creators',
            route: '/all_creators'
        },
        {
            label: 'Brand Fans',
            route: '/brand_fans'
        }
    ]

    const sidebarPaymentItems = [
        {
            label: 'Wallet',
            route: '/wallet'
        },
        {
            label: 'Unpaid Invoices',
            route: '/pending Invoices'
        },
        {
            label: 'Paid Invoices',
            route: '/paid_invoices'
        },
        {
            label: 'Rejected Invoices',
            route: '/rejected_invoices'
        }
    ]

    const [isOpen, setIsOpen] = useState(false);

    const handleSidebar = () =>{
         
        setIsOpen(!isOpen);
    }

    const { company_id, addBrandId, brand_id } = useContext(AuthContext)

    const [brands, setBrands] = useState([]);

    const [currentBrand, setCurrentBrand] = useState([]);

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{

        fetch(`${process.env.REACT_APP_API_URL}/all_brands/${company_id}`)
        .then((response)=> response.json())
        .then(response => {

            let newArray = response.filter( resp => resp._id == brand_id )
            setCurrentBrand(newArray);

            setSelectedOption({value: newArray[0]._id, label: (
                <div className='flex gap-4 items-center'>
                    <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${newArray[0].brand_logo}`}
                    alt={newArray[0].brand_name}
                    className='w-1/4'
                    />
                    <div className='text-xs lg:text-sm w-3/4'>{newArray[0].brand_name}</div>
                </div>
              )})
            setBrands(response)
        })
        .catch(err => console.log(err))
    },[])

    const options = brands.map((brand) => ({
    value: brand._id,
    label: (
        <div className='flex gap-4 items-center'>
        <img
            src={`${process.env.REACT_APP_API_URL}/uploads/${brand.brand_logo}`}
            alt={brand.brand_name}
            className='w-1/4 object-contain'
        />
        <div className='text-sm lg:text-sm w-3/4'>{brand.brand_name}</div>
        </div>
    ),
    }));


    useEffect(()=>{
        if(selectedOption){
            addBrandId(selectedOption.value) 
        }
    },[selectedOption])


  return (
    <div
      className={`text-sm min-h-screen bg-gradient-to-l from-slate-800 via-slate-800 to-slate-900 ${
        isOpen ? 'w-64' : 'w-16'
      } transition-width duration-500 ease-in-out fixed top-0 left-0 z-100 overflow-hidden`}
    >
        { isOpen && 

        <div className='m-5'>
          { brands.length > 0 && 
          
          <Select options={options} onChange={setSelectedOption} defaultValue={{value: currentBrand[0]._id, label: (
            <div className='flex gap-4 items-center'>
                <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${currentBrand[0].brand_logo}`}
                alt={currentBrand[0].brand_name}
                className='w-1/4'
                />
                <div className='text-xs lg:text-sm w-3/4'>{currentBrand[0].brand_name}</div>
            </div>
          )}}
          /> }
        </div>


        }

        <MenuIcon htmlColor="#0284c7" style={{float: 'right', marginRight: 22, marginTop: 40, marginBottom: 20}} onClick={handleSidebar}/>

        <div
        className={`mt-24 ml-4 lg:ml-${isOpen ? '12' : '8'} `}
      >
            

            <Link onClick={handleSidebar} className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 text-sm" to={"/all_campaigns"}>
                <CampaignIcon />
                <div style={{display: isOpen ? 'block' : 'none'}}>CAMPAIGNS</div> 
            </Link>
            {
                sidebarCampaignItems.map(item=>(
                    <Link onClick={() => handleSidebar()} className="flex text-white text-xs py-2 ml-8 lg:ml-10 mr-1 align-middle gap-4 hover:text-blue-200" to={item.route}>

                        {item.icon}
                    <div style={{display: isOpen ? 'block' : 'none'}}>{item.label}</div> 

                    </Link>
                ))
            }
            <Link onClick={handleSidebar} className="flex text-white text-sm py-2 align-middle gap-4 hover:text-blue-400" to={"/my_brands"}>
                <MilitaryTechIcon />
                <div style={{display: isOpen ? 'block' : 'none'}}>MY BRANDS</div> 
            </Link>
            


            <Link onClick={handleSidebar} className="flex text-white text-sm py-2 align-middle gap-4 hover:text-blue-400" to={"/creator_groups"}>
                <BrandingWatermarkIcon />
                <div style={{display: isOpen ? 'block' : 'none'}}>CREATOR GROUPS</div> 
            </Link>
            {/* {
                sidebarBrandItems.map(item=>(
                    <Link onClick={() => handleSidebar()} className="flex text-white text-sm py-2 ml-8 lg:ml-10 mr-1 align-middle gap-4 hover:text-blue-200" to={item.route}>

                        {item.icon}
                    <div style={{display: isOpen ? 'block' : 'none'}}>{item.label}</div> 

                    </Link>
                ))
            } */}

            <Link onClick={handleSidebar} className="flex text-white text-sm py-2 align-middle gap-4 hover:text-blue-400" to={"/all_campaigns"}>
                <PaidIcon />
                <div style={{display: isOpen ? 'block' : 'none'}}>PAYMENTS</div> 
            </Link>
            {
                sidebarPaymentItems.map(item=>(
                    <Link onClick={() => handleSidebar()} className="flex text-xs text-white py-2 ml-8 lg:ml-10  mr-1 align-middle gap-4 hover:text-blue-200" to={item.route}>

                        {item.icon}
                    <div style={{display: isOpen ? 'block' : 'none'}}>{item.label}</div> 

                    </Link>
                ))
            }
        </div>
    </div> 
  )
}

export default RightSidebar
