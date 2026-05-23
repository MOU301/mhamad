
// import React, { use, useContext, useEffect, useState } from 'react'
// import { Context } from '../../../Context/Context'
// import { IoLogoInstagram } from "react-icons/io5"
// import { FaTiktok, FaRegEnvelope, FaFacebook, FaTelegram, FaSleigh } from 'react-icons/fa'


// import { NavLink } from 'react-router'

// const Footer = () => {
// const {login,userInfo}=useContext(Context);
//   const [dataMessage,setDataMessage]=useState({"user_id":'',"email":"","message":""});
//   const [messageSend,setMessageSend]=useState('');

//   useEffect(() => {
//     if (login) {
//       setDataMessage({
//         user_id: userInfo.id,
//         email: userInfo.email,
//         message: ''
//       })
//     }
//   }, [login, userInfo])

//   const handleData = (e) => {
//     const { name, value } = e.target
//     setDataMessage(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleMessage = async (e) => {
//     e.preventDefault()

//     if (!dataMessage.message.trim()) {
//       setMessageSend('Bitte Nachricht eingeben')
//       return
//     }

//     try {
//       const res = await axiosInstance.post(`/api/addmessage`, dataMessage)
//       setMessageSend(res.data.message)
//     } catch (error) {
//       setMessageSend('Fehler beim Senden')
//     }
//   }

//   useEffect(() => {
//     if (messageSend !== '') {
//       const timer = setTimeout(() => {
//         setMessageSend('')
//         setDataMessage(prev => ({ ...prev, message: '' }))
//       }, 4000)

//       return () => clearTimeout(timer)
//     }
//   }, [messageSend])

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete your account?')) {
//       try {
//         const res = await axiosInstance.delete(`/api/deleteAccount`)
//         if (res.data.message === 'success') {
//           window.location.reload()
//         }
//       } catch (error) {}
//     }
//   }

//   return (
//     <section className="relative mt-20 font-sans">

  
//   <div />

//   <div className="container mx-auto px-4">
//     <div className=" bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 transition-all ">

//       <div className="grid md:grid-cols-2 gap-16">

       
//         <div className="space-y-6">

//           {[
//             { icon: <IoLogoInstagram />, name: "Instagram" },
//             { icon: <FaTiktok />, name: "TikTok" },
//             { icon: <FaFacebook />, name: "foryoulearn" },
//             { icon: <FaTelegram />, name: "@foryoulearn" },
//             { icon: <FaRegEnvelope />, name: "support@foryoulearn.com" },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-4 text-lg group cursor-pointer transition"
//             >
//               <div className="text-2xl text-[var(--main-color)] group-hover:scale-125 group-hover:rotate-6 transition duration-300">
//                 {item.icon}
//               </div>
//               <span className="group-hover:text-[var(--main-color)] text-[var(--second-background)] text-base">
//                 {item.name}
//               </span>
//             </div>
//           ))}

//         </div>

//         {/* Message Section */}
//         {login ? (
//           <form onSubmit={handleMessage} className="space-y-8 relative">

//             {/* Animated Success Message */}
//             {messageSend && (
//               <div className={`transition-all duration-500 transform ${
//                 messageSend === 'success'
//                   ? 'opacity-100 translate-y-0 bg-green-100 text-green-700'
//                   : 'opacity-100 translate-y-0 bg-red-100 text-red-600'
//               } p-4 rounded-xl text-center shadow-md`}>
//                 {messageSend}
//               </div>
//             )}

//             {/* Floating Email */}
//             <div className="relative">
//               <input
//                 type="email"
//                 value={dataMessage.email}
//                 readOnly
//                 className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-[var(--main-color)]"
//               />
//               <label className="absolute left-0 -top-5 text-sm text-gray-500">
//                 Email
//               </label>
//             </div>

//             {/* Floating Textarea */}
//             <div className="relative">
//               <textarea
//                 name="message"
//                 value={dataMessage.message}
//                 onChange={handleData}
//                 rows="5"
//                 className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:outline-none focus:border-[var(--main-color)] resize-none"
//                 placeholder=" "
//               />
//               <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-focus:-top-5 peer-focus:text-[var(--main-color)] peer-focus:text-sm">
//                 اكتب رسالتك هنا
//               </label>
//             </div>

//             {/* Animated Send Button */}
//             <button
//               type="submit"
//               className="relative overflow-hidden bg-[var(--main-color)] text-white px-8 py-3 rounded-full font-semibold shadow-lg group transition duration-300"
//             >
//               <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
//                 إرسال
//               </span>

//               {/* Button Shine Effect */}
//               <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
//             </button>

//           </form>
//         ) : (
//           <div className="flex flex-col items-center justify-center text-center space-y-6">
//             <p className="text-gray-600">
//               يرجى تسجيل الدخول لإرسال رسالة.
//             </p>
//             <NavLink
//               to="/login"
//               className="bg-[var(--main-color)] text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300"
//             >
//               Anmelden
//             </NavLink>
//           </div>
//         )}

//       </div>

//       {/* Bottom Section */}
//       <div className="border-t mt-16 pt-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">

//         <div className="flex flex-wrap gap-3">
//           <NavLink to="/policy" className="hover:text-[var(--main-color)] transition">PrivacyPolicy</NavLink>
//           <NavLink to="/cookie" className="hover:text-[var(--main-color)] transition">Cookie Policy</NavLink>
//           <NavLink to="/terms" className="hover:text-[var(--main-color)] transition">Terms</NavLink>
//           <NavLink to="/impressum" className="hover:text-[var(--main-color)] transition">Impressum</NavLink>

//           {login && (
//             <button
//               onClick={handleDelete}
//               className="text-red-500 hover:underline transition"
//             >
//               Delete Account
//             </button>
//           )}
//         </div>

//         <div className="text-gray-500">
//           © 2026 foryoulearn, Inc.
//         </div>

//       </div>

//     </div>
//   </div>
// </section>

//   )
// }

// export default Footer
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Context/Context'
import { NavLink } from 'react-router'
import axiosInstance from '../../../API/Api'    
import Logo from './Logo'


const socials = [
  {
    platform: 'Instagram', handle: '@foryoulearn', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  },
  {
    platform: 'TikTok', handle: '@foryoulearn', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/></svg>
  },
  {
    platform: 'Facebook', handle: 'foryoulearn', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  },
  {
    platform: 'Telegram', handle: '@foryoulearn', href: '#',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  },
  {
    platform: 'Email', handle: 'support@foryoulearn.com', href: 'mailto:support@foryoulearn.com',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  },
]

const navLinks = [
  { to: '/policy', label: 'Privacy Policy' },
  { to: '/cookie', label: 'Cookie Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/impressum', label: 'Impressum' },
]

// Shared styles
const fieldInputStyle = {
  background: '#f8f7f3',
  border: '1.5px solid rgba(43,108,176,0.12)',
  borderRadius: '10px',
  padding: '10px 13px',
  fontSize: '0.88rem',
  fontFamily: 'Lato, sans-serif',
  color: '#16355a',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
}

const Footer = () => {
  const { login, userInfo } = useContext(Context)
  const [dataMessage, setDataMessage] = useState({ user_id: '', email: '', message: '' })
  const [messageSend, setMessageSend] = useState('')

  useEffect(() => {
    if (login) setDataMessage({ user_id: userInfo.id, email: userInfo.email, message: '' })
  }, [login, userInfo])

  useEffect(() => {
    if (!messageSend) return
    const t = setTimeout(() => {
      setMessageSend('')
      setDataMessage(p => ({ ...p, message: '' }))
    }, 4000)
    return () => clearTimeout(t)
  }, [messageSend])

  const handleData = e => {
    const { name, value } = e.target
    setDataMessage(p => ({ ...p, [name]: value }))
  }

  const handleMessage = async e => {
    e.preventDefault()
    if (!dataMessage.message.trim()) { setMessageSend('Bitte Nachricht eingeben'); return }
    try {
      const res = await axiosInstance.post('/api/addmessage', dataMessage)
      setMessageSend(res.data.message)
    } catch { setMessageSend('Fehler beim Senden') }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return
    try {
      const res = await axiosInstance.delete('/api/deleteAccount')
      if (res.data.message === 'success') window.location.reload()
    } catch {}
  }

  const isSuccess = messageSend === 'success'

  return (
    <section className="mt-20" style={{ fontFamily: 'Lato, sans-serif' }}>
      <div className="container mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'white',
            border: '1px solid rgba(43,108,176,0.1)',
            boxShadow: '0 12px 50px rgba(22,53,90,0.09)'
          }}
        >
          {/* Top gradient stripe */}
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #2B6CB0, #16355a, #2B6CB0)' }} />

          {/* Main grid */}
          <div className="grid md:grid-cols-2">

            {/* ── LEFT: Brand + Socials ── */}
            <div
              className="flex flex-col gap-8 p-10 md:p-12"
              style={{ borderRight: '1px solid rgba(43,108,176,0.07)' }}
            >
              {/* Brand */}
              <Logo/>

              {/* Socials */}
              <div className="flex flex-col gap-1">
                {socials.map(({ platform, handle, href, icon }) => (
                  <a
                    key={platform}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline group transition-all duration-200"
                    style={{ border: '1px solid transparent' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(43,108,176,0.05)'
                      e.currentTarget.style.borderColor = 'rgba(43,108,176,0.12)'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: 'rgba(43,108,176,0.08)', color: '#2B6CB0' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#2B6CB0'; e.currentTarget.style.color = 'white' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(43,108,176,0.08)'; e.currentTarget.style.color = '#2B6CB0' }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest" style={{ color: '#2f2e41', opacity: 0.38 }}>{platform}</div>
                      <div className="text-sm font-bold" style={{ color: '#16355a' }}>{handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form / Not logged in ── */}
            <div className="flex flex-col gap-5 p-10 md:p-12">
              {login ? (
                <>
                  <h3 className="text-xl font-bold m-0" style={{ color: '#16355a', fontFamily: 'Amiri, serif' }} dir="rtl">
                    راسلنا — <span style={{ color: '#2B6CB0' }}>Schreib uns</span>
                  </h3>

                  {messageSend && (
                    <div
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-center"
                      style={{
                        background: isSuccess ? 'rgba(22,163,74,0.07)' : 'rgba(220,38,38,0.07)',
                        border: `1px solid ${isSuccess ? 'rgba(22,163,74,0.2)' : 'rgba(220,38,38,0.2)'}`,
                        color: isSuccess ? '#16a34a' : '#dc2626'
                      }}
                    >
                      {isSuccess ? '✓ Nachricht erfolgreich gesendet!' : messageSend}
                    </div>
                  )}

                  <form onSubmit={handleMessage} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2f2e41', opacity: 0.5 }}>Email</label>
                      <input
                        type="email"
                        value={dataMessage.email}
                        readOnly
                        style={fieldInputStyle}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5" dir="rtl">
                      <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#2f2e41', opacity: 0.5 }}>
                        رسالتك · Nachricht
                      </label>
                      <textarea
                        name="message"
                        value={dataMessage.message}
                        onChange={handleData}
                        rows={5}
                        placeholder="اكتب رسالتك هنا…"
                        style={{ ...fieldInputStyle, resize: 'none', fontFamily: 'Amiri, serif' }}
                        onFocus={e => { e.target.style.borderColor = '#2B6CB0'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(43,108,176,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(43,108,176,0.12)'; e.target.style.background = '#f8f7f3'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="self-start relative overflow-hidden text-white px-7 py-2.5 rounded-full font-bold text-base transition-all duration-200 hover:-translate-y-0.5 group"
                      style={{
                        background: '#2B6CB0', border: 'none',
                        fontFamily: 'Amiri, serif',
                        boxShadow: '0 4px 16px rgba(43,108,176,0.28)',
                        cursor: 'pointer'
                      }}
                    >
                      <span className="relative z-10">إرسال ↗</span>
                      <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 gap-5 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(43,108,176,0.08)', border: '1px solid rgba(43,108,176,0.15)' }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2B6CB0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <p className="text-sm m-0" style={{ color: '#2f2e41', opacity: 0.65, fontFamily: 'Amiri, serif' }} dir="rtl">
                    يرجى تسجيل الدخول لإرسال رسالة.
                  </p>
                  <NavLink
                    to="/login"
                    className="text-white no-underline px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: '#2B6CB0',
                      boxShadow: '0 4px 14px rgba(43,108,176,0.28)'
                    }}
                  >
                    Anmelden →
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-3 px-10 md:px-12 py-4 flex-wrap"
            style={{
              borderTop: '1px solid rgba(43,108,176,0.07)',
              background: 'rgba(43,108,176,0.02)'
            }}
          >
            <div className="flex flex-wrap gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="text-xs px-2.5 py-1 rounded-md no-underline transition-all duration-200"
                  style={{ color: '#2f2e41', opacity: 0.55 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,108,176,0.07)'; e.currentTarget.style.color = '#2B6CB0'; e.currentTarget.style.opacity = 1 }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2f2e41'; e.currentTarget.style.opacity = 0.55 }}
                >
                  {label}
                </NavLink>
              ))}
              {login && (
                <button
                  onClick={handleDelete}
                  className="text-xs px-2.5 py-1 rounded-md border-none bg-transparent cursor-pointer transition-all duration-200"
                  style={{ color: '#dc2626', opacity: 0.65 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.07)'; e.currentTarget.style.opacity = 1 }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = 0.65 }}
                >
                  Delete Account
                </button>
              )}
            </div>
            <div className="text-xs" style={{ color: '#2f2e41', opacity: 0.4 }}>
              © 2026 <span style={{ color: '#2B6CB0', fontWeight: 700 }}>foryoulearn</span>, Inc.
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer
