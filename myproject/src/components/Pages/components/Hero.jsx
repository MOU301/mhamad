// import { useNavigate } from 'react-router';
// import React, { useContext, useState } from 'react'
// import { Context} from '../../../Context/Context'
// // import image from '../../../assets/image1.svg'
// const image = '/storage/images/image1.svg'

// const Hero = () => {
//      const navigate=useNavigate(null)
//     const {Uapi}=useContext(Context);
//     const handleClick=()=>{
//         navigate('/courses');
//     }
//   return (
//     <section className="mt-20 font-serif" dir="rtl">
//   <div className="container mx-auto px-4">
//     <div className="flex flex-col-reverse md:flex-row items-center gap-12">

//       {/* Text Card */}
//       <div
//         className="w-full md:w-1/2 flex flex-col
//                    justify-center space-y-6 text-right
//                    border border-white/40
//                    transition-all shadow-2xl bg-white/70 p-6 rounded-lg"
//       >
//         <h2 className="text-[var(--main-color)] text-2xl font-bold text-center">
//           تعلم اللغة الألمانية 
//         </h2>

//         <p className="text-[var(--second-background)]/90 text-base text-center md:text-right">
//           ابدأ تعلم اللغة الألمانية من الصفر، وكن مستعدًا للحياة اليومية خلال 4 أسابيع فقط.
//         </p>

//         <h3 className="flex md:items-center text-[var(--main-color)] text-base md:text-xl font-semibold gap-2">
//           <span>🔵</span> كل درس يتضمن:
//         </h3>

//         <ul className="mr-5 space-y-2 text-[var(--second-background)]/80 text-base border-r-2 border-[var(--main-color)] pr-4">
//           <li className="flex items-center gap-2 before:content-['←'] before:font-bold before:text-[var(--main-color)]">
//             فيديوهات
//           </li>
//           <li className="flex items-center gap-2 before:content-['←'] before:font-bold before:text-[var(--main-color)]">
//             تسجيلات صوتية 
//           </li>
//           <li className="flex items-center gap-2 before:content-['←'] before:font-bold before:text-[var(--main-color)]">
//             حوارات واقعية 
//           </li>
//           <li className="flex items-center gap-2 before:content-['←'] before:font-bold before:text-[var(--main-color)]">
//             تمارين تفاعلية 
//           </li>
//           <li className="flex items-center gap-2 before:content-['←'] before:font-bold before:text-[var(--main-color)]">
//             مهام كتابية وأسئلة اختبارية لقياس تقدمك
//           </li>
//         </ul>

//         <button
//           className="relative self-start md:self-end overflow-hidden bg-[var(--main-color)] text-white px-8 py-3 rounded-full font-semibold shadow-lg group transition duration-300"
//           onClick={() => handleClick()}
//         >
//           <span className="relative group-hover:tracking-wider transition-all duration-300">
//             ابدأ الآن
//           </span>
//           <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
//         </button>
//       </div>

//       {/* Image */}
//       <div className="w-full md:w-1/2">
//         <img
//           src={Uapi + image}
//           alt="تعلم الألمانية A1"
//           className="h-auto object-cover rounded-lg animate-wiggle"
//         />
//       </div>

//     </div>
//   </div>
// </section>
//   )
// }

// export default Hero
import { useNavigate } from 'react-router';
import React, { useContext } from 'react'
import { Context } from '../../../Context/Context'

const Hero = () => {
  const navigate = useNavigate(null)
  const { Uapi } = useContext(Context);

  return (
    <section
      className="mt-20 font-serif relative overflow-hidden"
      dir="rtl"
      style={{ background: 'var(--main-background)' }}
    >
      {/* Background decorative circles */}
      <div className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'rgba(43,108,176,0.07)' }} />
      <div className="absolute -bottom-16 right-1/3 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'rgba(22,53,90,0.05)' }} />
      <div className="absolute top-10 right-16 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: 'rgba(43,108,176,0.12)' }} />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-5xl mx-auto">

          {/* ── Text Side ── */}
          <div className="flex-1 flex flex-col gap-5 animate-[fadeSlideIn_0.7s_ease_both]">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-xs font-bold tracking-widest"
              style={{
                background: 'rgba(43,108,176,0.1)',
                border: '1px solid rgba(43,108,176,0.2)',
                color: 'var(--main-color)',
                fontFamily: 'Lato, sans-serif'
              }}>
              <span className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--main-color)' }} />
              DEUTSCH LERNEN · المستوى A1
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--second-color)' }}>
              تعلّم{' '}
              <span className="relative" style={{ color: 'var(--main-color)' }}>
                اللغة الألمانية
                <span className="absolute bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--main-color), transparent)' }} />
              </span>
              <br />من الصفر
            </h1>

            {/* Subtitle */}
            <p className="text-base leading-relaxed opacity-85"
              style={{ color: 'var(--second-background)' }}>
              ابدأ رحلتك مع الألمانية وكن مستعداً للحياة اليومية خلال 4 أسابيع فقط — بأسلوب ممتع وفعّال.
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-2.5">
              {[
                { icon: '▶', text: 'فيديوهات تعليمية احترافية' },
                { icon: '◉', text: 'تسجيلات صوتية بنطق أصيل' },
                { icon: '💬', text: 'حوارات واقعية يومية' },
                { icon: '✓', text: 'تمارين تفاعلية ومهام كتابية' },
                { icon: '📊', text: 'اختبارات لقياس مستوى تقدمك' },
              ].map(({ icon, text }, i) => (
                <li key={i} className="flex items-center gap-3 text-sm"
                  style={{ color: 'var(--second-background)', animationDelay: `${i * 0.1}s` }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                    style={{
                      background: 'rgba(43,108,176,0.12)',
                      color: 'var(--main-color)'
                    }}>
                    {icon}
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => navigate('/courses')}
                className="relative overflow-hidden text-white px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-0.5 group"
                style={{
                  background: 'var(--main-color)',
                  boxShadow: '0 4px 20px rgba(43,108,176,0.35)'
                }}>
                <span className="relative z-10">ابدأ الآن مجاناً</span>
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>

              <button
                onClick={() => navigate('/courses')}
                className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-100 opacity-75"
                style={{ color: 'var(--main-color)' }}>
                استعرض الدورات
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Visual Card ── */}
          <div className="relative flex-shrink-0 w-full md:w-72">
            <div className="bg-white rounded-2xl p-7 relative"
              style={{
                border: '1px solid rgba(43,108,176,0.12)',
                boxShadow: '0 20px 60px rgba(22,53,90,0.1)'
              }}>

              {/* Flag badge */}
              <div className="absolute -top-3.5 right-5 text-white text-xs font-bold tracking-wider px-4 py-1.5 rounded-full"
                style={{ background: 'var(--main-color)', fontFamily: 'Lato, sans-serif' }}>
                🇩🇪 Deutsch A1
              </div>

              {/* Level display */}
              <div className="text-center mb-5">
                <div className="text-6xl font-bold leading-none" style={{ color: 'var(--main-color)', fontFamily: 'Lato, sans-serif' }}>A1</div>
                <div className="text-xs tracking-widest uppercase opacity-60 mt-1" style={{ color: 'var(--second-background)', fontFamily: 'Lato, sans-serif' }}>
                  Anfänger · مبتدئ
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  { num: '4', label: 'أسابيع' },
                  { num: '40+', label: 'درس' },
                  { num: '120', label: 'تمرين' },
                  { num: '∞', label: 'وصول' },
                ].map(({ num, label }) => (
                  <div key={label} className="rounded-xl p-2.5 text-center"
                    style={{ background: 'var(--main-background)' }}>
                    <div className="text-xl font-bold" style={{ color: 'var(--second-color)', fontFamily: 'Lato, sans-serif' }}>{num}</div>
                    <div className="text-xs opacity-65" style={{ color: 'var(--second-background)', fontFamily: 'Lato, sans-serif' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              {[
                { label: 'المفردات الأساسية', pct: 72 },
                { label: 'قواعد اللغة', pct: 45 },
              ].map(({ label, pct }) => (
                <div key={label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                    <span style={{ color: 'var(--second-background)', opacity: 0.7 }}>{label}</span>
                    <span className="font-bold" style={{ color: 'var(--main-color)' }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--main-background)' }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, var(--main-color), var(--second-color))`
                      }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating chips */}
            <div className="absolute -bottom-3 -left-5 bg-white rounded-full px-3 py-1.5 text-xs font-bold shadow-md animate-bounce"
              style={{ border: '1px solid rgba(43,108,176,0.15)', color: 'var(--second-color)', fontFamily: 'Lato, sans-serif' }}>
              Guten Morgen! 👋
            </div>
            <div className="absolute top-5 -left-8 bg-white rounded-full px-3 py-1.5 text-xs font-bold shadow-md"
              style={{
                border: '1px solid rgba(43,108,176,0.15)',
                color: 'var(--second-color)',
                fontFamily: 'Lato, sans-serif',
                animation: 'bounce 3s ease-in-out 1s infinite'
              }}>
              Wie geht's?
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero