import React from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { NavLink } from 'react-router';
import { useContext } from 'react';
import { Context} from '../../Context/Context';
const Menu = ({handling,dash}) => {
  const {next,login,userInfo}=useContext(Context)
  return (
   <div className='menu dnone'>
    <div className="close">
        <IoCloseCircle onClick={()=>handling()} className='icon fs-2'/>
        </div>
       <div className="menu-list d-flex justify-content-center align-items-center links">
       <ul className='list-group '>
                <li className='list-group-item text-center '>
                   <NavLink to='/' className='nav-link text-light ' onClick={()=>handling()} >Home</NavLink>
                 </li>
                               
                <li className='list-group-item text-center'>
                  <NavLink to="/courses" className='nav-link text-light' onClick={()=>handling()}>Courses</NavLink>
                </li>
                 <li className='list-group-item text-center'>
                  <NavLink to={login ? '/logout':'/login'} className='btn btn-second' onClick={()=>handling()}>{!login ? 'Login':'Log Out'}</NavLink>
                </li> 
                { userInfo!=null ?
               userInfo.role!='user' ? <li className='list-group-item text-center'>
                  <button className='btn btn-main text-light' onClick={()=>dash()}>Dashboard</button>
                </li>:''
                :'' }
                   
       </ul>
       </div>
   </div>
  )
}

export default Menu