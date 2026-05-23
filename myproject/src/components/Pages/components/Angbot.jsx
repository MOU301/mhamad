import React, { useContext } from 'react'
import angbot from '../../../assets/test/angbot.png';
import image1 from '../../../assets/test/image1.svg'
import {  useNavigate } from 'react-router';
import { Context } from '../../../Context/Context';

const Angbot = () => {
    const navigate=useNavigate(null)
    const {sendView}=useContext(Context);
    const handlClick=()=>{
        navigate('/courses');
    }
  return (
    <div>
        <div className="container">
            <div className='row angbot'>
                 

                <div  className='col-12 col-sm-6 d-flex flex-column justify-content-center align-items-center p-4'>
                    <h2 className="text-center my-5 fw-bold display-6 text-main">
                   Beginne jetzt, Deutsch zu lernen 
                    </h2>

                    <p className="text-center text-muted mx-auto mb-4" style={{maxWidth:"600px"}}>
                        <h5 >A1 Deutschkurs</h5>
                  Speziell für Anfänger entwickelt.  
Innerhalb von 4 Wochen werden Sie in der Lage sein, sich vorzustellen, alltägliche Gespräche zu verstehen und Schritt für Schritt selbstbewusst zu sprechen.
                    </p>

                    <div className="text-center">
                        <button className="btn btn-main text-white btn-lg px-5" onClick={()=>handlClick()}>
                            Jetzt starten<span class="arrow"></span>
                        </button>
                    </div>
                </div>
               <div className='col-12 col-sm-6'>
                    <div className="image-move p-5">
                        <img style={{fill:'red'}} src={image1} alt="Deutsch A1 " />
                    </div>
                </div>

            </div>
            {sendView ? <div className='text-center bg-light py-3 my-5'>
            <p className='py-3'>Es ist schön, wenn man eine Meinung äußert.</p>
            <button className='btn btn-main text-white' onClick={()=>navigate('/addView')}>Meinung hinzufügen</button>
            </div>:''}
        </div>
           

    </div>
  )
}

export default Angbot