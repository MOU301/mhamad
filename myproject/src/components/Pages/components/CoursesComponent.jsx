import React from 'react'
import CourseItem from './CourseItem'
const CourseComponent = ({courses}) => {
  return (
    <>
    <h3 className="text-[var(--main-color)] text-center text-lg "><strong>alle Kurse</strong></h3>
       

        <div className="grid  grid-cols-1 md:grid-cols-3 gap-5 my-10">
          {courses.map((data,index)=><div key={index}>
            <CourseItem data={data}/>
          </div>)}
          
        </div></>
  )
}

export default CourseComponent
