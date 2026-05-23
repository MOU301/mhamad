import React, { useContext, useEffect } from 'react'
import Carousel from './components/Carousel';
import View from './components/View';
import About from './components/About';
import Footer from './components/Footer';

import { Context } from '../../Context/Context';
import Angbot from './components/Angbot';
import CookieBanner from './CookieBanner';
import Hero from './components/Hero';

const Home = () => {
  const {setPathName}=useContext(Context);
  
useEffect(()=>{
  let url = new URL(window.location.href);
  setPathName(url.pathname);

  
},[])
  return (
  <>


   <Hero/>

   <About/>
   <View/>
   <CookieBanner/>
   <Footer/>


  </>
  )
}

export default Home
