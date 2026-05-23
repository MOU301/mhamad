import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import { Context } from '../../Context/Context';

const CourseSingel = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const {setPathName,myCouresData,courses,setCourse,lessons,update,dataTest,setCourseId,mustId,setEnded,ended}=useContext(Context);
   const [course1,setCourse1]=useState([]);
   
   
    useEffect(()=>{
    
    setCourseId(id);

      let url = new URL(window.location.href);
      setPathName(url.pathname)
      let courseConpy=null;
      
      if(myCouresData.filter(item=>item.id==id).length>0){
        courseConpy=myCouresData.filter(item=>item.id==id)
      }else if(courses.filter(item=>item.id==id).length>0){
       courseConpy=courses.filter(item=>item.id==id);
      }else{
        navigate('/courses');
      }
      
      if(courseConpy!=null){
        setCourse1(courseConpy);  
        setCourse(courseConpy);
    setEnded(courseConpy[0].ended)
  
     
      
      }
    // },[]);
    },[myCouresData,update]);


  return course1.length>0 ? (
  <section className="my-5 font-serif">
  <div className="container mx-auto px-4 overflow-hidden">
    <div>

      <h5 className='my-4 text-center' ><strong className='text-[var(--main-color)] '>{course1[0].title}</strong></h5>

      <ul className='flex flex-col space-y-2'>
        { lessons.length>0 ? lessons.map((item, index) => (
          !item.test && (
            <NavLink
                to={`lesson/${item.id}`}
               
              >
            <li key={item.id} className=' flex justify-between items-center bg-white rounded-2xl p-3 hover:text-[var(--main-color)] transition-all tracking-normal'>
               <span> {index + 1}. {item.title}</span>
        
               {item.id==mustId ? <span className=' w-3 h-3 rounded-full bg-[var(--main-color)] animate-ping mr-10'></span>:''}
            </li>
        </NavLink>
          )
        )):<h5>there are not lessons !!! </h5>}

        {dataTest.length > 0 && (
          <li className=' flex justify-between items-center bg-white rounded-2xl p-3 hover:text-[var(--main-color)] transition-all tracking-normal'>
            <NavLink
              to={`/test/${dataTest[0].id}`}
            >
             <span> 🧪 {dataTest[0].title}</span>
            </NavLink>
            <span className='w-3 h-3 rounded-full bg-[var(--main-color)] animate-ping mr-10'></span>
          </li>
        )}
      </ul>

    </div>
  </div>
</section>


  ):''
}

export default CourseSingel
