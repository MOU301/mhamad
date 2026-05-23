import React from 'react'
import Lesson from './components/Unterricht/Lesson'
import { createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router'
import { Route } from 'react-router'
import LayOut from './components/LayOut/LayOut'
import Login from './components/Pages/Login'
import Logout from './components/Pages/Logout'
import Home from './components/Pages/Home'

import CreateAcount from './components/Pages/CreateAcount'
import './App.css'
import CourseSingel from './components/Pages/CourseSingel'
import Course from './components/Pages/Course'
import Payment from './components/Pages/Payment'
import Translate from './components/Pages/Translate'
import Bot from './components/Pages/Bot';
import AddView from './components/Pages/AddView'
import PrivacyPolicy from './components/Pages/PrivacyPolicy'
import CookiePolicy from './components/Pages/CookiePolicy'
import TermsOfService from './components/Pages/TermsOfService'
import CheckEmail from './components/Pages/CheckEmail'
import Finsh from './components/Pages/Finsh'
import Test from './components/Test/Test'
import End from './components/Pages/End'
import Ubung1Click from './components/Unterricht/Ubung1Click';
import Ubung3Click from './components/Unterricht/Ubung3click';
import Ubung4Click from './components/Unterricht/Ubung4Click'; 
import WriteSentenceClick from './components/Unterricht/WriteSentenceClick'; 
import Impressum from './components/Pages/Impressum'
import Email from './components/Pages/Email'


// import BotTest from './components/Pages/BotTest';
const App = () => {
  const router=createBrowserRouter(createRoutesFromElements(
    
    <Route path='/' element={<LayOut/>}>
      <Route index element={<Home/>}/>
      <Route path='/courses' element={<Course/>}/>
      <Route path='/course/:id' element={<CourseSingel/>}/>
      <Route path='course/:id/lesson/:id' element={<Lesson/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/createAcount' element={<CreateAcount/>}/>
      <Route path='/payment/:id' element={<Payment/>}/>
      <Route path='/translate' element={<Translate/>}/>
      <Route path='/bot' element={<Bot/>}/>
      <Route path='/AddView' element={<AddView/>}/>
      <Route path='/policy' element={<PrivacyPolicy/>}/>
      <Route path='/impressum' element={<Impressum/>}/>
      <Route path='/check' element={<CheckEmail/>}/>
      <Route path='/finish' element={<Finsh/>}/>
      <Route path='/test/:id' element={<Test/>}/>
      <Route path='/end' element={<End/>}/>
      <Route path='/cookie' element={<CookiePolicy/>}/>
      <Route path='/terms' element={<TermsOfService/>}/>
      <Route path='/ubung1click/:id' element={<Ubung1Click/>}/>
      <Route path='/ubung3click/:id' element={<Ubung3Click/>}/>
      <Route path='/ubung4click/:id' element={<Ubung4Click/>}/>
      <Route path='/writeSentenceClick/:id' element={<WriteSentenceClick/>}/>
      <Route path='/email' element={<Email/>}/>
      
      

    
      {/* <Route path='/BotTest' element={<BotTest/>}/> */}
    </Route>

    ));
  return <RouterProvider router={router} />
}

export default App
