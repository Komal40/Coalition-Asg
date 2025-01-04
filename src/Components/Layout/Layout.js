import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import './Layout.css'
import { DataProvider } from '../../DataContext'
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineMoreHoriz } from "react-icons/md";
import dr from '../Navbar/woman.png'

function Layout() {
  const {userData}=useContext(DataProvider)
  const data=JSON.parse(sessionStorage.getItem('user'))
  console.log('sess lay',data)
  const navigate=useNavigate()

  const [selectedUser, setSelectedUSer]=useState(null)
  const handleSelectedUser=(user)=>{
    setSelectedUSer(user)
    navigate(`/data/${user.phone_number}`);
  }

useEffect(()=>{
  setSelectedUSer(data?.[3])
  navigate(`/data/${data[3]?.phone_number}`);
},[])
  console.log(selectedUser,'daata on layout')

  return (
    <div>
      <div className='main-layout'>

        <div className='leftsidebar'>

          <div className='layout_patients_main'>
           <div className='layout_patient_heading'>
           <h2>Patients</h2>
           <div><IoSearchSharp className='layout_search_icon'/></div>
           </div>

         {
          data && data.map((user)=>(
            <div className='layout_list_items' key={user.phone_number} onClick={()=>handleSelectedUser(user)}>
            <div className='layout_list_item'>
              <img src={user.profile_picture}/>
              <div className='layout_list_name'>
              <div className='layout_name'>{user.name}</div>
              <div className='layout_age'>{user.gender}, {user.age}</div>
              </div>
            </div>
              <div><MdOutlineMoreHoriz className='layout_horizontal'/></div>
           </div>
          ))
         }
         
          </div>

        </div>



        <div className='rightcontent'>
            <Outlet/>
        </div>

      </div>
    </div>
  )
}

export default Layout;