import React from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from './Context/gobalContext'
import { useContext } from 'react'
const Header = () => {
  const { profileComplete } = useContext(GlobalContext);
  const userName = JSON.parse(localStorage.getItem('name'));
  return (
    <div>
      <div className=' w-full h-[80px] flex justify-around bg-black text-white items-center text-3xl'>
        <div >
          <NavLink to='/main'> DashBoard</NavLink>
        </div>
        <div >
          <NavLink to='/profile'> Update Profile</NavLink>
        </div>
        

        {profileComplete && <div> <p>Hi, {userName}</p></div>}
      </div>
    </div>
  )
}

export default Header



