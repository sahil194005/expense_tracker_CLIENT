import React, { useState,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from './Context/gobalContext';
const Header = () => {
  const [verified, setVerified] = useState(false);
  const {setIsDark} = useContext(GlobalContext)
  const mailVerificationHandler = (e) => {
    e.preventDefault();
   //backend call to verify mail
    setVerified(true);
  }

  const logOutHandler = (e) => {
    e.preventDefault();
    localStorage.clear('token');
    window.location.href = '/';
  }
  return (
    <div >
      <div className=' w-full h-[80px] flex justify-around bg-black text-white items-center text-3xl'>
        <div >
          <NavLink to='/main'> DashBoard</NavLink>
        </div>
        <div >
          <NavLink to='/profile'> Update Profile</NavLink>
        </div>
        <div className='border border-white p-2 rounded-lg cursor-pointer' onClick={mailVerificationHandler}>
          {/* <p>{!verified?'Verify ?':'Verified'}</p> */}
          <p>Verified User</p>
        </div>
        <div className=' border border-white p-2 rounded-lg active:bg-gray-400'>
          <button onClick={()=>{setIsDark((state)=>!state)}}>Toggle Theme</button>
        </div>
        <div className='border border-white p-2 rounded-lg cursor-pointer' onClick={logOutHandler}>
          <p>Log Out</p>
        </div>
      </div>
    </div>
  )
}

export default Header



