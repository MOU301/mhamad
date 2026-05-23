import React, { useContext } from 'react'
import { Context } from '../../../Context/Context';
//the maincrousel kommt aus database
// import image1 from '../../../assets/test/example/s1.png';
// import image2 from '../../../assets/test/example/s2.png';
// import image3 from '../../../assets/test/example/s3.png';
// import image4 from '../../../assets/test/example/s4.png';       
// import image5 from '../../../assets/test/example/s5.png';
// import image6 from '../../../assets/test/example/s6.png';
// import image7 from '../../../assets/test/example/s7.png';
// import image8 from '../../../assets/test/example/s8.png';   
// import image9 from '../../../assets/test/example/s9.png';
// import image10 from '../../../assets/test/example/s10.png';
// import image11 from '../../../assets/test/example/s11.png';
// import image12 from '../../../assets/test/example/s12.png';
// import image13 from '../../../assets/test/example/s13.png';
// const images=[image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13];
const Carousel = () => {
  const {maincarousel}=useContext(Context);

   
  return (
    <section className='container my-5'>

<div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel">
    <div className="carousel-inner box-shadow border-20 ">
       {/* {images.map((data,index)=><div className={`carousel-item   carousel-image ${index==0 ? 'active':''}`} key={index}>
     <img  className="d-block border-20 " src={data} />
     </div>)} */}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
</div>
</section>
  )
}

export default Carousel
