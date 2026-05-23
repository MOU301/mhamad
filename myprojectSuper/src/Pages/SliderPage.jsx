import React, { useContext, useEffect } from 'react'
import Slider from '../Components/slider'
import { Context } from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'

const SliderPage = () => {
const {slider,loading,Ulogin}=useContext(Context);
  return !loading ?  (
    <div>
     {slider!=null ?  <Slider slider={slider}/>:''}
    </div>
  ):<Spinner/>
}

export default SliderPage
