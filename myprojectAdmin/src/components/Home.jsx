import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Context } from '../context/Context'




const Home = () => {
  const {mycourses,Uuser}=useContext(Context)


  const main=()=>{
    window.location.href=Uuser;       
  }

  return (
   <section className='my-3'>
    <div className='container'>
       <div className="d-flex justify-content-between">
         <div>
              <NavLink to='/addCourse' className='btn btn-success mx-2'>Add course</NavLink>
       {mycourses.length>0 ? <NavLink to='/myCourses' className='btn btn-success'>my courses</NavLink>:''}
          </div>
          <div>
            
            <button onClick={()=>main()} className='btn btn-success'> Main</button></div>
       
       </div>
    </div>
   </section>
 )
}

export default Home
