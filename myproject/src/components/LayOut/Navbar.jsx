// import React, { useContext, useEffect, useState } from 'react'
// import { FaUserCircle } from "react-icons/fa";
// import { TiThMenuOutline } from "react-icons/ti";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { LiaSchoolSolid } from "react-icons/lia";
// import { CgLogIn,CgLogOut  } from "react-icons/cg";

// // import './navbar.css'
// import { NavLink } from 'react-router';
// import {Context} from '../../Context/Context'


// const Navbar = () => {
//   const {next,login,pathName,userInfo,Usuper,Uadmin}=useContext(Context)
//   const pattern = /^\/course\/\d+\/lesson\/\d+$/;
  
//   const handling=()=>{
//     let menu=document.getElementsByClassName('menu')[0];
//     menu.classList.contains('dblock') ?
//      (menu.classList.remove('dblock'),menu.classList.add('dnone'))
//      :
//      (menu.classList.add('dblock'),menu.classList.remove('dnone'))
//   }
//   const dash=()=>{
//     window.location.href=userInfo.role=='super' ? Usuper:Uadmin; 
//   }

//   return (
//     //  <section className={(next==null) ?  'one':(pattern.test(pathName) ? 'd-none':'one')} id='home'>
//     //    <Menu handling={handling} dash={dash}/>
//     //    <div className="container">
//     //        <div className="d-flex justify-content-between align-content-center align-items-center">
            
//     //       <NavLink className='nav-link' to='/'>  <div  className="logo "><strong><span className='text-main'>For</span><span className='text-second'>You</span></strong><span className='learn'>learn</span></div></NavLink>
              
//     //          <TiThMenuOutline onClick={(()=>handling())} className='icons fs-1 text-main'/>
//     //         <div className="links">
//     //         <ul className='list-group list-group-horizontal'>
//     //             <li className='list-group-item'>
//     //               <NavLink to="/courses" className='nav-link text-second course1'><LiaSchoolSolid  className='fs-3'/></NavLink>
//     //             </li>
               
//     //         { userInfo!=null ?
//     //            userInfo.role!='user' ? <li className='list-group-item '>
//     //               <button className=' btn bg-dashboard text-main dashboard' onClick={()=>dash()}><MdOutlineAdminPanelSettings className='fs-3'/></button>
//     //             </li>:''
//     //             :'' }
//     //             <li className='list-group-item'>
                 
//     //               <NavLink to={login ? '/logout':'/login'} className={`btn btn-login text-white ${login ? 'logout1':'login1'}`}>{!login ? <CgLogIn className='fs-4'/>:<CgLogOut className='fs-4' />}</NavLink> 
//     //               {/* <NavLink to={login ? '/logout':'/login'} className='btn btn-second'>{!login ? 'Login':'Log Out'}</NavLink> */}
//     //             </li>      
//     //           </ul>
//     //         </div>
//     //        </div>
//     //    </div>
//     //  </section>
//      <nav className='bg-[var(--second-background)] w-full '>
//     <div className="container mx-auto flex justify-between items-center content-center">
//      <NavLink to='/'>
//        <div className="relative text-2xl opacity-80 hover:opacity-100 cursor-pointer p-2  hover:after:content-['Startseite'] after:absolute after:bottom-[-12px]  hover:after:px-2 hover:after:py-1 after:bg-[var(--main-color)] after:text-sm after:rounded-md after:text-[var(--main-background)]  after:transition-all  ">
//         <strong className="text-[var(--main-color)] border-y-2 border-b-[var(--main-background)] rounded-full ">for<span className='text-[var(--main-background)]'>you</span></strong>
//         <span className='text-[var(--main-background)] text-base '>learn</span>
//       </div>
//       </NavLink>
//       <ul className=' flex content-center items-center text-[var(--main-background)] space-x-10 mr-3 text-base'>
//         <li className='text-[var(--main-background)]' >
//             <NavLink to="/courses" className="relative opacity-80 hover:opacity-100 cursor-pointer 
//                                           hover:after:content-['kurs'] 
//                                           after:absolute after:bottom-[-30px] after:left-5 after:px-2 after:py-1 after:bg-[var(--main-color)]
//                                            after:text-sm after:rounded-md after:text-[var(--main-background)] after:opacity-0 
//                                            hover:after:opacity-100 after:transition-all  " 
//                     >
//               <LiaSchoolSolid className='text-2xl'/>
//              </NavLink>
//         </li>
//        {userInfo!=null ? 
//         userInfo.role!='user' ?
//         <li >
//           <button className="relative text-[var(--main-color)]
//                after:left-5 opacity-80 hover:opacity-100 cursor-pointer 
//                hover:after:content-['Dashboard'] after:absolute after:bottom-[-30px] 
//                after:px-2 after:py-1 after:bg-[var(--main-color)] after:text-sm
//                after:rounded-md after:text-[var(--main-background)]
//                after:opacity-0 h hover:after:opacity-100 after:transition-all  " 
//                onClick={()=>dash()}>
//               <MdOutlineAdminPanelSettings className='text-2xl'/></button>
//               </li>
//         :'' :''}
//      <li>
//   <NavLink
//     to={login ? "/logout" : "/login"}
//     className={`
//       relative 
//       opacity-80 hover:opacity-100 
//       cursor-pointer
//       after:absolute 
//       after:left-5 
//       after:bottom-[-30px] 
//       after:px-2 
//       after:py-1
//       after:bg-[var(--main-color)] 
//       after:text-sm 
//       after:rounded-md 
//       after:text-[var(--main-background)]
//       after:opacity-0 
//       after:transition-all 
//       hover:after:opacity-100
//       ${login 
//         ? "hover:after:content-['logout']" 
//         : "hover:after:content-['login']"
//       }
//     `}
//   >
//    {!login ? <CgLogIn className='text-2xl'/>:<CgLogOut className='text-2xl' />}
//   </NavLink>
// </li>


//       </ul>  
//     </div>
//    </nav>
//   )
// }

// export default Navbar
import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { Context } from '../../Context/Context'

const CourseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
    <path d="M12 14l6.16-3.42A12 12 0 0 1 12 21a12 12 0 0 1-6.16-9.42L12 14z"/>
  </svg>
)
const AdminIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const LoginIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
)
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

// Reusable nav icon button with tooltip
const NavBtn = ({ tooltip, onClick, children, className = '', as: Tag = 'button', ...props }) => (
  <div className="relative group">
    <Tag
      onClick={onClick}
      className={`
        w-[42px] h-[42px] rounded-xl flex items-center justify-center
        border transition-all duration-200 cursor-pointer
        hover:-translate-y-0.5
        ${className}
      `}
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,108,176,0.25)'; e.currentTarget.style.borderColor = 'rgba(43,108,176,0.5)'; e.currentTarget.style.color = 'white' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
      {...props}
    >
      {children}
    </Tag>
    {tooltip && (
      <span
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
        style={{ background: '#2B6CB0' }}
      >
        {tooltip}
      </span>
    )}
  </div>
)

const Navbar = () => {
  const { next, login, pathName, userInfo, Usuper, Uadmin } = useContext(Context)
  const pattern = /^\/course\/\d+\/lesson\/\d+$/

  if (next !== null && pattern.test(pathName)) return null

  const dash = () => {
    window.location.href = userInfo.role === 'super' ? Usuper : Uadmin
  }

  return (
    <nav className="w-full" style={{ background: '#16355a' }}>
      <div
        className="mx-auto flex items-center justify-between px-6"
        style={{ maxWidth: '1100px', height: '64px' }}
      >
        {/* Logo */}
       <div className="relative group">
            <NavLink
              to="/"
              className="inline-flex items-baseline no-underline rounded-full px-4 py-1 transition-all duration-200"
              style={{ border: '1.5px solid rgba(43,108,176,0.45)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7bb3e8'; e.currentTarget.style.background = 'rgba(43,108,176,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(43,108,176,0.45)'; e.currentTarget.style.background = 'transparent' }}
            >
              <strong>
                <span style={{ color: '#7bb3e8' }}>For</span>
                <span className="text-white">You</span>
              </strong>
              <span className="text-xs font-light ml-0.5 self-center" style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.09em' }}>learn</span>
            </NavLink>

        </div>

        {/* Nav items */}
        <ul className="flex items-center gap-2 list-none m-0 p-0">

          {/* Courses */}
          <li>
            <NavBtn as={NavLink} to="/courses" tooltip="Kurse">
              <CourseIcon />
            </NavBtn>
          </li>

          {/* Admin — only for non-user roles */}
          {userInfo?.role && userInfo.role !== 'user' && (
            <>
              <li>
                <div className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
              </li>
              <li>
                <NavBtn onClick={dash} tooltip="Dashboard" style={{ color: '#7bb3e8' }}>
                  <AdminIcon />
                </NavBtn>
              </li>
            </>
          )}

          {/* Separator */}
          <li>
            <div className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </li>

          {/* Login / Logout pill */}
          <li>
            <NavLink
              to={login ? '/logout' : '/login'}
              className="flex items-center gap-2 px-4 h-[42px] rounded-xl font-bold text-sm text-white no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: login ? 'rgba(255,255,255,0.08)' : '#2B6CB0',
                border: login ? '1px solid rgba(255,255,255,0.15)' : '1px solid #2B6CB0',
                boxShadow: login ? 'none' : '0 4px 12px rgba(43,108,176,0.35)'
              }}
            >
              {login ? <LogoutIcon /> : <LoginIcon />}
              {login ? 'Abmelden' : 'Anmelden'}
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  )
}

export default Navbar