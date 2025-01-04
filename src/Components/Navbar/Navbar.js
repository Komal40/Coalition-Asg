import React, { useState } from 'react'
import './Navbar.css'
import logo from './TestLogo.svg'
import dr from './woman.png'
import { GoHome } from "react-icons/go";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { SlCreditCard } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from 'react-router';




function Navbar() {

  const [activeTab, setActiveTab]=useState('Patients')
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    if(tab!=='Patients'){
     navigate('/else')
    }else{
      navigate('/data')
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  document.querySelectorAll('.navbar_items ul li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.navbar_items ul li.active')?.classList.remove('active');
        item.classList.add('active');
    });
});



  return (
    <nav className='navbar'>
      {/* logo */}
    <div className='navbar_logo'>
    <img src={logo}/>
    </div>

{/* content */}
   <div className={`navbar_item_dr ${menuOpen ? "menuactive" : ""}`}>
   <div className='navbar_items'>
    <ul>
        <li className={activeTab=='Overview'?'active':''}  onClick={() => handleActiveTab('Overview')}><GoHome/><span>Overview</span></li>
        <li className={activeTab=='Patients' ? 'active':''} onClick={()=>handleActiveTab('Patients')}><MdOutlinePeopleAlt/><span>Patients</span></li>
        <li className={activeTab=='Schedule'?'active':''} onClick={()=>handleActiveTab('Schedule')}><CiCalendar/><span>Schedule</span></li>
        <li className={activeTab=='Message'?'active':''} onClick={()=>handleActiveTab('Message')}><FaRegMessage/><span>Message</span></li>
        <li className={activeTab=='Transactions'?'active':''} onClick={()=>handleActiveTab('Transactions')}><SlCreditCard/><span>Transactions</span></li>
   
    </ul>
    </div>
    <div className='navbar_profile'>
        <div className='navbar_profile_'>
            <img src={dr}/>
           <div>
           <div className='dr'>Dr. Jose Simmons</div>
           <div className='general_pract'>General Practitioner</div>
           </div>
        </div>
        <div className='navbar_setting'>
            <div><IoSettingsOutline/><span><IoEllipsisVertical/></span></div>
        </div>
         {/* Hamburger icon */}
      
    </div>
   </div>

{/* hamberger */}
<div className="hamburger" onClick={toggleMenu}>
       
            <div></div>
            <div></div>
            <div></div>
          
        
      </div>
      
    </nav>
  )
}

export default Navbar;
