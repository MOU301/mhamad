import React, { useContext, useEffect, useState } from 'react'
import CourseItem from './CourseItem'
import { Context } from '../../../Context/Context'
import { useNavigate } from 'react-router';

const MyCoursesComponent = ({MyCourses}) => {
  return (
    <>
 
            <h3 className="text-[var(--main-color)] text-center text-lg "><strong>Meine Kurse</strong> </h3>
      
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-5 my-10">
         {MyCourses.map((data,index)=><div  key={index}>
            <CourseItem data={data} type='mycourses'/>
        </div>)}
        </div>
    </>
  )
}

export default MyCoursesComponent  
