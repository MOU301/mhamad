// import React from 'react'
// import { Context} from '../../../Context/Context'
// import { useContext } from 'react'
// // import step1 from '../../../assets/step1.svg'
// // import step2 from '../../../assets/step2.svg'
// // import step3 from '../../../assets/step3.svg'
// const step1 = '/storage/images/step1.svg'
// const step2 = '/storage/images/step2.svg'
// const step3 = '/storage/images/step3.svg'

// const About = () => {
//   const {Uapi}=useContext(Context);
//   return (
//   <section
//   className="container mx-auto bg-[var(--second-background)] mt-20 py-16 px-6 font-serif rounded-2xl shadow-2xl "
//   dir="rtl"
// >
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-20">

//     {/* Card 1 */}
//     <div className="flex flex-col items-center text-center space-y-6">
//       <img src={Uapi + step2} alt="من نحن" className="w-40 h-auto" />
//       <p className="text-[var(--main-color)] leading-relaxed">
//         نحن منصة تعليمية متخصصة نساعد المتعلمين على إتقان اللغة الألمانية
//         بطريقة سهلة، واضحة، وفعّالة.
//       </p>
//     </div>

//     {/* Card 2 */}
//     <div className="flex flex-col items-center text-center space-y-6">
//       <img src={Uapi + step1} alt="أهدافنا" className="w-50 h-auto" />
//       <p className="text-[var(--main-color)] leading-relaxed">
//         هدفنا تقديم دورات عالية الجودة، وتمارين تفاعلية، ومحتوى عملي
//         يواكب مواقف الحياة اليومية.
//       </p>
//     </div>

//     {/* Card 3 */}
//     <div className="flex flex-col items-center text-center space-y-6">
//       <img src={Uapi + step3} alt="طريقتنا" className="w-40 h-auto" />
//       <p className="text-[var(--main-color)] leading-relaxed">
//         تعلّم بالوتيرة التي تناسبك، مع دعم من مدرّسين ذوي خبرة
//         ومجتمع تعليمي نشِط يساعدك على الاستمرار والتقدم.
//       </p>
//     </div>

//   </div>
// </section>

//   )
// }

// export default About
import React, { useContext } from 'react'
import { Context } from '../../../Context/Context'

const cards = [
  {
    num: '01',
    label: 'من نحن',
    title: 'منصة تعليمية متخصّصة',
    body: 'نساعد المتعلمين على إتقان اللغة الألمانية بطريقة سهلة، واضحة، وفعّالة — بغض النظر عن مستواهم الحالي.',
    tag: 'تعليم متخصص',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="10" r="5" stroke="#7bb3e8" strokeWidth="1.8"/>
        <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#7bb3e8" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'أهدافنا',
    title: 'محتوى عالي الجودة',
    body: 'دورات احترافية وتمارين تفاعلية ومحتوى عملي يواكب مواقف الحياة اليومية — لأن التعلم الحقيقي يبدأ من الاستخدام الفعلي.',
    tag: 'جودة عالية',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="10" stroke="#7bb3e8" strokeWidth="1.8"/>
        <circle cx="16" cy="16" r="5" stroke="#7bb3e8" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="1.5" fill="#7bb3e8"/>
        <line x1="16" y1="6" x2="16" y2="4" stroke="#7bb3e8" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'طريقتنا',
    title: 'تعلّم بوتيرتك الخاصة',
    body: 'تعلّم بالوتيرة التي تناسبك، مع دعم مدرّسين ذوي خبرة ومجتمع نشِط يساعدك على الاستمرار والتقدم خطوة بخطوة.',
    tag: 'مرونة تامة',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M8 16l5 5 11-11" stroke="#7bb3e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="4" width="24" height="24" rx="6" stroke="#7bb3e8" strokeWidth="1.8"/>
      </svg>
    ),
  },
]

const stats = [
  { num: '+500', label: 'متعلم نشط' },
  { num: '40+',  label: 'درس متاح' },
  { num: '4.9',  label: 'تقييم المتعلمين' },
  { num: 'A1→C1', label: 'المستويات المتاحة' },
]

const About = () => {
  return (
    <section
      className="container mx-auto mt-20 py-16 px-6 md:px-10 font-serif rounded-2xl relative overflow-hidden"
      style={{ background: 'var(--second-background)' }}
      dir="rtl"
    >
      {/* Background accents */}
      <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(43,108,176,0.08)' }} />
      <div className="absolute -bottom-16 left-[10%] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'rgba(43,108,176,0.06)' }} />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4"
          style={{
            background: 'rgba(43,108,176,0.15)',
            border: '1px solid rgba(43,108,176,0.3)',
            color: '#7bb3e8',
            fontFamily: 'Lato, sans-serif'
          }}>
          ÜBER UNS · من نحن
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          لماذا تختار <span style={{ color: '#7bb3e8' }}>منصّتنا</span>؟
        </h2>
        <div className="w-12 h-0.5 mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, #2B6CB0, transparent)' }} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {cards.map(({ num, label, title, body, tag, icon }) => (
          <div
            key={num}
            className="group flex flex-col items-center text-center gap-5 p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Top shimmer line on hover — via group-hover via inline style trick */}
            <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, transparent, #2B6CB0, transparent)' }} />

            {/* Ghost number */}
            <span className="absolute top-3 left-4 text-5xl font-bold select-none pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.04)', fontFamily: 'Lato, sans-serif' }}>
              {num}
            </span>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(43,108,176,0.15)',
                border: '1px solid rgba(43,108,176,0.25)'
              }}>
              {icon}
            </div>

            {/* Label */}
            <span className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#7bb3e8', fontFamily: 'Lato, sans-serif' }}>
              {label}
            </span>

            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-snug m-0">{title}</h3>

            {/* Body */}
            <p className="text-sm leading-loose m-0" style={{ color: 'rgba(255,255,255,0.62)' }}>
              {body}
            </p>

            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs mt-auto"
              style={{
                background: 'rgba(43,108,176,0.15)',
                border: '1px solid rgba(43,108,176,0.2)',
                color: '#7bb3e8',
                fontFamily: 'Lato, sans-serif'
              }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7bb3e8' }} />
              {tag}
            </div>
          </div>
        ))}
      </div>

      {/* Stats footer */}
      <div className="mt-12 pt-8 flex justify-center gap-10 flex-wrap relative z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {stats.map(({ num, label }, i) => (
          <React.Fragment key={label}>
            {i > 0 && (
              <div className="w-px self-stretch hidden md:block"
                style={{ background: 'rgba(255,255,255,0.08)' }} />
            )}
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#7bb3e8', fontFamily: 'Lato, sans-serif' }}>
                {num}
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Lato, sans-serif' }}>
                {label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default About