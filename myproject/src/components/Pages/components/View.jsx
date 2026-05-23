// import React, { useContext, useState } from 'react'
// import { PiSelectionSlashDuotone } from 'react-icons/pi';
// import { SiPanasonic } from 'react-icons/si'
// import { Context } from '../../../Context/Context';
// import { AiFillQqCircle, AiOutlineDoubleLeft } from 'react-icons/ai';
// import { AiOutlineDoubleRight } from 'react-icons/ai'

// import a1 from '../../../assets/test/avatars/a1.svg'
// import a2 from '../../../assets/test/avatars/a2.svg'
// import a3 from '../../../assets/test/avatars/a3.svg'
// import a4 from '../../../assets/test/avatars/a4.svg'
// import a5 from '../../../assets/test/avatars/a5.svg'
// import a6 from '../../../assets/test/avatars/a6.svg'
// const avatars=[a4,a5,a6,a1,a2,a3];
// const View = () => {
//     const {views}=useContext(Context);
//     const [first,setFirst]=useState(0);
//     const [last,setLast]=useState(3);
//    const handlNext=()=>{
//     if(first+3<views.length){
//         setFirst(pre=>pre+3);
//     }
//     if(last+3<views.length){
//         setLast(pre=>pre+3)
//     }
//     else if(last<views.length){
//       setLast(views.length);
//     }
//    }
//    const handlPrev=()=>{
//     if(first>6){
//         setFirst(pre=>pre-3);
//     }else if(3<first<6){
//         setFirst(0)
//     }else{
//         setFirst(0);
//     }
//     if(last>6){
//         setLast(pre=>pre-3)
//     }else if (3<last<6){
//         setLast(3);
//     }else{
//         setLast(3);
//     }
   
//    }
//   return views.length > 0 ? (
//     <section className='container border-top views'> 
//     <h3 className='my-4 text-main my-5'> <strong>Was haben die Leute gesagt? </strong></h3> 
//             {views.length>3 ? <><div className='text-center my-4 change-view d-flex justify-content-evenly align-items-center'>
//            <button className='btn bg-main2  mx-2' onClick={()=>handlPrev()}><AiOutlineDoubleLeft /></button>
//            <button className='btn bg-main2 mx-2' onClick={()=>handlNext()}><AiOutlineDoubleRight /></button>
//         </div></>:''}
//         <div className='row'>
              
//             {views.slice(first, last).map((item, index) => (
//   <div className='col-sm-6 col-md-4 col-12 my-2' key={index}>
//     <div className="box-shadow p-3 view-card bg-white" style={{ borderRadius: '10px' }}>
      
  
//       <div className="d-flex align-items-center mb-3">

//         <div 
//           className="rounded-circle d-flex align-items-center justify-content-center bg-light " 
//           style={{ width: '80px', height: '80px', border: '1px solid #eee', overflow: 'hidden' }}
//         >
//           {avatars ? (
//             <img src={avatars[index%6]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           ) : (
      
//             <i className="bi bi-person-fill text-secondary" style={{ fontSize: '24px' }}></i>
//           )}
//         </div>

//         <div className="ms-3">
//           <strong className="text-dark d-block">{item.name}</strong>
//           {/* يمكنك إضافة تقييم نجوم هنا إذا أردت */}
//           <small className="text-warning">★★★★★</small>
//         </div>
//       </div>


//       <p className="my-2 text-muted italic" style={{ fontSize: '0.95rem' }}>
//         "{item.view || item.body}"
//       </p>
      
     

//       <div className='text-small mt-2 bottom'>
    
//      <hr  />
//         <span className="text-muted">Ich lerne: </span>
//         {item.learn.map((lang, idx) => (
//           <span key={idx} className='text-main'>
//             <strong> {lang}</strong> 
//           </span>
//         ))}
//       </div>
      
//     </div>
//   </div>
// ))}
         
//         </div>

//     </section>
//   ):''
// }

// export default View
import React, { useContext, useState } from 'react'
import { Context } from '../../../Context/Context'

const avatarColors = ['#2B6CB0','#16355a','#1e5ea8','#2563a8','#0c4a7a','#1a4f8a']

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="#f59e0b">
    <path d="M10 1l2.4 6.9H20l-5.9 4.3 2.3 6.9L10 14.8l-6.4 4.3 2.3-6.9L0 7.9h7.6z"/>
  </svg>
)

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M8.5 3L5 7l3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 3L9 7l-3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ITEMS_PER_PAGE = 3

const View = () => {
  const { views } = useContext(Context)
  const [page, setPage] = useState(0)

  if (!views || views.length === 0) return null

  const totalPages = Math.ceil(views.length / ITEMS_PER_PAGE)
  const start = page * ITEMS_PER_PAGE
  const slice = views.slice(start, start + ITEMS_PER_PAGE)

  // get initials from name
  const getInitials = (name = '') =>
    name.split(' ').slice(0, 2).map(w => w[0]).join('')

  return (
    <section className="container mx-auto my-20 px-4 font-serif">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4"
          style={{
            background: 'rgba(43,108,176,0.1)',
            border: '1px solid rgba(43,108,176,0.2)',
            color: 'var(--main-color)',
            fontFamily: 'Lato, sans-serif'
          }}>
          BEWERTUNGEN · آراء المتعلمين
        </div>
        <h2 className="text-3xl font-bold m-0" style={{ color: 'var(--second-color)' }}>
          ماذا يقول <span style={{ color: 'var(--main-color)' }}>طلّابنا</span>؟
        </h2>
        <div className="w-12 h-0.5 mx-auto mt-3 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--main-color), transparent)' }} />
      </div>
  {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-105"
            style={{
              background: 'white',
              border: '1.5px solid rgba(43,108,176,0.3)',
              color: 'var(--main-color)',
              cursor: page === 0 ? 'default' : 'pointer'
            }}>
            <ChevronLeft />
          </button>

          <div className="flex gap-1.5">
            {Array(totalPages).fill(null).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="rounded-full border-none transition-all duration-200"
                style={{
                  width: i === page ? '20px' : '8px',
                  height: '8px',
                  background: i === page ? 'var(--main-color)' : 'rgba(43,108,176,0.2)',
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= totalPages - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-105"
            style={{
              background: 'white',
              border: '1.5px solid rgba(43,108,176,0.3)',
              color: 'var(--main-color)',
              cursor: page >= totalPages - 1 ? 'default' : 'pointer'
            }}>
            <ChevronRight />
          </button>
        </div>
      )}
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        {slice.map((item, i) => {
          const globalIdx = start + i
          return (
            <div
              key={globalIdx}
              className="bg-white rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid rgba(43,108,176,0.08)',
                boxShadow: '0 2px 12px rgba(22,53,90,0.05)'
              }}
            >
              {/* decorative quote mark */}
              <span className="absolute top-[-10px] right-4 text-9xl pointer-events-none select-none leading-none"
                style={{ color: 'rgba(43,108,176,0.05)', fontFamily: 'Georgia, serif' }}>
                "
              </span>

              {/* User row */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{
                    background: avatarColors[globalIdx % avatarColors.length],
                    fontFamily: 'Lato, sans-serif'
                  }}>
                  {getInitials(item.name)}
                </div>
                <div>
                  <strong className="block text-sm font-bold" style={{ color: 'var(--second-color)' }}>
                    {item.name}
                  </strong>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array(5).fill(null).map((_, s) => <StarIcon key={s} />)}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm leading-loose flex-1 italic m-0"
                style={{ color: 'var(--second-background)', opacity: 0.8 }}>
                "{item.view || item.body}"
              </p>

              {/* Footer */}
              <div className="flex items-center gap-2 flex-wrap pt-3"
                style={{ borderTop: '1px solid rgba(43,108,176,0.08)' }}>
                <span className="text-xs" style={{ color: 'var(--second-background)', opacity: 0.5, fontFamily: 'Lato, sans-serif' }}>
                  Ich lerne:
                </span>
                {item.learn.map((lang, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(43,108,176,0.1)',
                      color: 'var(--main-color)',
                      border: '1px solid rgba(43,108,176,0.15)',
                      fontFamily: 'Lato, sans-serif'
                    }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

    
    </section>
  )
}

export default View
// import React, { useContext, useState } from 'react'
// import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
// import { Context} from '../../../Context/Context'

// // import a1 from '../../../assets/test/avatars/a1.svg'
// // import a2 from '../../../assets/test/avatars/a2.svg'
// // import a3 from '../../../assets/test/avatars/a3.svg'
// // import a4 from '../../../assets/test/avatars/a4.svg'
// // import a5 from '../../../assets/test/avatars/a5.svg'
// // import a6 from '../../../assets/test/avatars/a6.svg'
// const a1 = '/storage/images/a1.svg'
// const a2 = '/storage/images/a2.svg'
// const a3 = '/storage/images/a3.svg'    
// const a4 = '/storage/images/a4.svg'
// const a5 = '/storage/images/a5.svg'
// const a6 = '/storage/images/a6.svg'

// const avatars = [a4, a5, a6, a1, a2, a3]

// const View = () => {
// const {views,Uapi}=useContext(Context);
//   const [page, setPage] = useState(0)

//   const itemsPerPage = 3
//   const start = page * itemsPerPage
//   const end = start + itemsPerPage

//   const handleNext = () => {
//     if (end < views.length) {
//       setPage(prev => prev + 1)
//     }
//   }

//   const handlePrev = () => {
//     if (page > 0) {
//       setPage(prev => prev - 1)
//     }
//   }

//   if (!views || views.length === 0) return null

//   return (
//     <section className="container mx-auto my-20 px-4">

   
  

//       {/* Navigation Buttons */}
//       {views.length > itemsPerPage && (
//         <div className="flex justify-center gap-4 mb-8">
//           <button
//             onClick={handlePrev}
//             className="bg-[var(--main-color)] text-white p-3 rounded-full hover:opacity-90 transition"
//           >
//             <AiOutlineDoubleLeft size={20} />
//           </button>

//           <button
//             onClick={handleNext}
//             className="bg-[var(--main-color)] text-white p-3 rounded-full hover:opacity-90 transition"
//           >
//             <AiOutlineDoubleRight size={20} />
//           </button>
//         </div>
//       )}

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

//         {views.slice(start, end).map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
//           >

//             {/* User Header */}
//             <div className="flex items-center gap-4 mb-4">

//               <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
//                 <img
//                   src={Uapi + avatars[index % avatars.length]}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div>
//                 <strong className="block text-gray-800">
//                   {item.name}
//                 </strong>
//                 <small className="text-yellow-500">
//                   ★★★★★
//                 </small>
//               </div>

//             </div>

//             {/* Review Text */}
//             <p className="text-gray-600 italic mb-4">
//               "{item.view || item.body}"
//             </p>

//             {/* Footer */}
//             <div className="pt-4 border-t border-gray-200 text-sm">
//               <span className="text-gray-500">Ich lerne: </span>
//               {item.learn.map((lang, idx) => (
//                 <span
//                   key={idx}
//                   className="text-[var(--main-color)] font-semibold ml-1"
//                 >
//                   {lang}
//                 </span>
//               ))}
//             </div>

//           </div>
//         ))}

//       </div>

//     </section>
//   )
// }

// export default View
