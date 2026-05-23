import React, { useContext, useEffect, useReducer } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Context } from '../Context/Context'

const LayOut = () => {
  const {setLogin,Uuser}=useContext(Context);

  const styleActive=({isActive})=>{
   return isActive ? 'text-danger':'text-black'
  }
  const main=()=>{
   window.location.href=Uuser
  }
  return (
   <>
   <div className='container'>
    <div className='d-flex justify-content-between my-3'>
      <ul className="list-group list-group-horizontal">
          <li className="list-group-item"><NavLink className={styleActive} to='/user' ><strong>User</strong></NavLink></li>
          <li className="list-group-item"><NavLink className={styleActive} to='/' ><strong>Courses</strong></NavLink></li>
          <li className="list-group-item"><NavLink className={styleActive} to='/slider' ><strong>Slider</strong></NavLink></li>
          <li className="list-group-item"><NavLink className={styleActive} to='/views' ><strong>Views</strong></NavLink></li>
          <li className='list-group-item'><NavLink className={styleActive} to='/message'><strong>Messages</strong></NavLink></li>
          <li className='list-group-item'><button className='btn btn-success' onClick={()=>main()}> Main</button><strong></strong></li>
      </ul>
    </div>
    <Outlet/>
    </div>
   </>
  )
}

export default LayOut
