import React, { useContext, useEffect } from 'react'
import axiosInstance from '../Api/api';
import { NavLink } from 'react-router-dom';
import { Context } from '../Context/Context';
const CourseItem = ({courses}) => {

  const {setCourses}=useContext(Context);
    const remove=async(index,id)=>{
    
      const remove=confirm('delet the course'+id);
      if(remove){
      await axiosInstance.delete(`/api/courses/${id}`).then(res=>{
        console.log(res.data);
        if(res.data.message=="success"){
          const newCourses=courses.filter((_,i)=>index!=i);
          setCourses(newCourses);
        }else{
          console.log(res.data.message);
        }
      }).catch(error=>console.log(error));
    
      }
    }
    const Accept=async(id)=>{
      
    await axiosInstance.put(`/api/agreeCourse/${id}`,{
       withCredentials:true
    }).then(res=>{
      if(res.data.message=='success'){      
      setCourses(pre=>pre.map(item=>
        item.id==id ? {...item,state:item.state===0 ? 1:0} : item
       ))
      }
    }).catch(error=>console.log(error));
    
    }
  return (
    <>
    {courses.map((item,index)=><div className='border p-2' key={index}>
                                       <div><strong>Title : </strong>{item.title}</div>
                                       <div><strong>Author : </strong>{item.author_name}</div>
                                       <div><strong>Lessons : </strong>{item.lessons}</div>
                                       <NavLink to={`/usersCours/${item.id}`}><strong>users : </strong>{item.users}</NavLink>
                                       <div><strong>Price : </strong>{item.price}</div>
                                       <div>
                                        <button  className='btn btn-dark'>show</button>
                                       {item.users>0 ? '':<button onClick={()=>remove(index,item.id)} className='btn btn-danger mx-2'>delete</button> }
                                     <button className='btn btn-success mx-2' onClick={()=>Accept(item.id)}>{!item.state ? "active":"not Active"}</button>
                                       </div>
                                     </div>
          
          )
        }</>
  )
}

export default CourseItem
