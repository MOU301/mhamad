// import React, { useCallback, useContext, useEffect, useState } from 'react'
// import { Context } from '../../Context/Context'


// import { GoogleLogin } from '@react-oauth/google';
// import { NavLink, useNavigate } from 'react-router';
// import axiosInstance from '../../API/Api';
// import axios from 'axios';


// const Form = ({type,children,handleGoogleLogin}) => {
//   const {message,setMessage, setRegisterInfo,Uapi,setUserInfo,setLogin}=useContext(Context);
// const [vergessen,setVergessen]=useState(false);

// const [loginInfo,setLoginInfo]=useState({'email':'',"password":""});
// const [register, setRegister] = useState({ 'name': '', "email": '', "password": '' });
// const [info,setInfo]=useState(null)
// const [perEmail,setPerEmail]=useState(false);
// const [mes,setMes]=useState('')
//   const navigate = useNavigate(null)
// useEffect(()=>{
//   setPerEmail(false);
// },[])
// const handlSend=(e)=>{
//    setInfo(pre=>({...pre,[e.target.name]:e.target.value}))
// }

// const handlLogin = async (e) => {
//   e.preventDefault();

//   if (loginInfo.email !== '' && loginInfo.password !== '') {
//     try {
//       await axios.get(`${Uapi}/sanctum/csrf-cookie`, {
//         withCredentials: true
//       });

//       const resLog = await axiosInstance.post ('/api/login', loginInfo);
       
//       if(resLog.data.message=='success'){
//          setLogin(true);
//          setUserInfo(resLog.data.user);
//          navigate('/')
//       }else{
//         setMes(resLog.data.message);
//       }
//     } catch (error) {
//       setMes('refresh and retry again')
//     }
//   } else {
//     setMes('fill the field please ');
//   }
// };
//  const handlInput=(e)=>{
//       const {name,value}=e.target;
//       setLoginInfo({...loginInfo,[name]:value});
//     }
//   const handlCreate = async (e) => {
//     e.preventDefault();

//     if (register.name && register.email && register.password) {
//       try {
      
//         await axios.get(`${Uapi}/sanctum/csrf-cookie`, {
//         withCredentials: true
//       });

//         const res = await axiosInstance.post(`/api/request-otp`, register);
      
//         if (res.data.message == 'success') {
         
//           setRegisterInfo(register);
//           navigate('/check');
//         }
//       } catch (error) {
//         alert(error.response?.data?.message || 'Error while creating account');
//       }
//     } else {
//       setMes('Please fill all fields.');
//     }
//   };

// const handlVergessen=async(e)=>{
//     e.preventDefault();
  
 
//     if(info!=null ){
//     if(info.password===info.repeat && info.password!='' && email!=''){
  
//         try {
//           await axios.get(`${Uapi}/sanctum/csrf-cookie`, {
//         withCredentials: true
//       });
     
//         const res = await axiosInstance.post(`/api/changePassword`,info);
        
//         if (res.data.message === 'success') {
//           setRegisterInfo(info);
//           navigate('/check');
//         }
//       } catch (error) {
//         alert(error.response?.data?.message || 'Error while creating account');
//       }
//     }else{
    
//         setMes('check your password')
//     }
//     }
    
// }
//  const handlRegister = (e) => {
//     const { name, value } = e.target;
//     setRegister({ ...register, [name]: value });
//   };
//   const handleEmail=()=>{
//     setPerEmail(true)
//   }

// const rrr=useCallback(()=>{
//     // return <form onSubmit={type=='login' ? handlLogin:handlCreate}>
//        return <form onSubmit={vergessen ? handlVergessen :(type=='login' ? handlLogin:handlCreate)}>
//      <div className='flex justify-center items-center content-center h-[100vh] font-serif '>

//       <div className='w-[350px] border-1 border-[var(--main-color)] p-3'>
//        <h3 className='text-center text-[var(--main-color)] font-bold '><strong>{vergessen ? 'neues Passwort': (type=='login' ? 'Anmelden':"Konto erstellen")}</strong></h3>
//             {mes!='' ? <div className='bg-amber-100 text-red-500 text-center my-3 border-1 rounded-xl text-sm '><strong>{mes}</strong></div>:""}
//        {!vergessen ?  <div>
         
           
//              {handleGoogleLogin!=null ? 
//              <div className=' my-3'> 
                
//                {!perEmail ?   <div className=' rounded-xl'>
//                   <GoogleLogin
//                     onSuccess={handleGoogleLogin}
//                     onError={() => alert('Google login failed')}
//                   />
//                  </div> :''}
//                  {!perEmail ? <div className='text-center my-3 bg-white py-1 px-2 cursor-pointer hover:bg-blue-100 text-[var(--main-color)]' onClick={()=>handleEmail()}>
//                     Email
//                  </div>:""}
                 
           
            
//          </div>:''}
//      <div className='my-3'>
//             {type!="login" ? 
//             (<div className='flex flex-col'>
//                 <label className='text-gray-800 font-semibold mb-1' htmlFor="name"><strong>User Name :</strong> </label>
//                 <input className='w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent transition' onChange={(e)=>type=='login' ? '':handlRegister(e)} name='name' id='name' type='text' placeholder='Name' required/>
//             </div>)
//             :''
//             }
            
//             {(perEmail  || type!='login')? <>
//             <div className='my-3'>
//                 <label className='text-gray-800 font-semibold mb-1' htmlFor="email"><strong>Email : </strong></label>
//                 <input className='w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent transition' onChange={(e)=>type=='login' ? handlInput(e):handlRegister(e)} name='email' type='email' id='email' placeholder='example@gmail.com' required/>
//             </div>
            
//             <div className='my-3'>
//                 <label className='text-gray-800 font-semibold mb-1' htmlFor="password"><strong>Password : </strong></label>
//                 <input type=" password" onChange={(e)=>type=='login' ? handlInput(e):handlRegister(e)} className='w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent transition  ' name='password' placeholder='**********' required/>
//             </div>
            
            
//            <div className='my-3 flex justify-between'> 
//             <button type='submit' className='bg-[var(--main-color)] text-white px-4 py-2 rounded-lg  hover:opacity-80 cursor-pointer transition duration-300'>{type=='login' ? "Anmelden":"Konto erstellen"}</button>
//           {type=='login' ? <button className='bg-[var(--second-background)] ml-2 px-4 text-white py-2 rounded-lg hover:opacity-80 cursor-pointer transition duration-300' onClick={()=>setPerEmail(false)}>Zurück</button>:''}

//             </div>
//             </>:''}
            
         
         
//              </div>
//           {(type=='login' && perEmail )? <div className=' mt-5 mb-2 text-sm text-[var(--main-color)] cursor-pointer hover:opacity-80' onClick={()=>setVergessen(true)}>Habe Sie Ihr Passwort vergessen ?</div>:''}
//         </div>:
//         <div>  
//             <br/>
//             <div>
//                 <label className='text-gray-800 font-semibold mb-1' htmlFor="email"><strong>Email : </strong></label>
//                 <input className='w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent transition' onChange={(e)=>handlSend(e)}  name='email' type='email' id='email' placeholder='example@gmail.com' required/>
//             </div>
//              <br/>
//             <div>
//                 <label className='text-gray-800 font-semibold mb-1' htmlFor="password"><strong>neues Passwort : </strong></label>
//                 <input type=" password" onChange={(e)=>handlSend(e)}  className='w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent transition  ' name='password' placeholder='**********' required/>
//             </div>
//              <br/>
//             <div>
//                 <label className='text-gray-800 font-semibold mb-1' htmlFor="password"><strong>Passwort wiederholen :</strong></label>
//                 <input type=" password" onChange={(e)=>handlSend(e)}  className='w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-transparent transition  ' name='repeat' placeholder='**********' required/>
//             </div>
//             <br/>
//              <div className='flex justify-between'>
//                 <button type='submit' className='bg-[var(--main-color)] text-white px-4 py-2 rounded-lg  hover:opacity-80 cursor-pointer transition duration-300'>Speichern</button>
//                <button  className='text-[var(--main-color)] hover:opacity-80 cursor-pointer transition duration-300' onClick={()=>setVergessen(false)}>Zurück</button>
//              </div>

//         </div>}
//         {perEmail  ? "":(vergessen ? "":(type!='login'?'': <><div className='text-center  font-bold text-[var(--main-color)] my-5'>OR </div>
//           {children}
//           </>))}
//         </div>
      
//        </div></form>
// },[vergessen,info,register,loginInfo,mes,perEmail])
   
//   return (
  
//         <>{rrr()}</>
//   )
// }

// export default Form
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Context } from '../../Context/Context'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router'
import axiosInstance from '../../API/Api'
import axios from 'axios'


// ── Reusable icons ──────────────────────────────────────────
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)
const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M8.5 3L5 7l3.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Field component ─────────────────────────────────────────
const Field = ({ label, icon, type = 'text', placeholder, name, value, onChange, required }) => (
  <div className="mb-4">
    <label
      className="block text-xs font-bold uppercase tracking-widest mb-1.5"
      style={{ color: '#2f2e41', opacity: 0.55 }}
    >
      {label}
    </label>
    <div className="relative">
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'rgba(43,108,176,0.45)' }}
      >
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: '#f8f7f3',
          border: '1.5px solid rgba(43,108,176,0.12)',
          color: '#16355a',
          fontFamily: 'Lato, sans-serif'
        }}
        onFocus={e => {
          e.target.style.borderColor = '#2B6CB0'
          e.target.style.background = 'white'
          e.target.style.boxShadow = '0 0 0 3px rgba(43,108,176,0.08)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(43,108,176,0.12)'
          e.target.style.background = '#f8f7f3'
          e.target.style.boxShadow = 'none'
        }}
      />
    </div>
  </div>
)

// ── Shared card wrapper ─────────────────────────────────────
const AuthCard = ({ title, subtitle, stripeStyle, children, footer }) => (
  <div
    className="w-full rounded-3xl overflow-hidden"
    style={{
      background: 'white',
      border: '1px solid rgba(43,108,176,0.1)',
      boxShadow: '0 20px 60px rgba(22,53,90,0.1)'
    }}
  >
    <div className="h-1" style={{ background: stripeStyle || 'linear-gradient(90deg, #2B6CB0, #16355a)' }} />
    <div className="p-8 md:p-10">
      {/* Logo + heading */}
      <div className="text-center mb-8">

        <h2 className="text-2xl font-bold mb-1 text-[var(--main-color)]" style={{  fontFamily: 'Amiri, serif' }}>{title} </h2>
        <p className="text-xs" style={{ color: '#2f2e41', opacity: 0.45 }}>{subtitle}</p>
      </div>
      {children}
    </div>
    {footer && (
      <div
        className="px-8 py-4 text-center text-sm"
        style={{ borderTop: '1px solid rgba(43,108,176,0.08)', background: 'rgba(43,108,176,0.02)' }}
      >
        {footer}
      </div>
    )}
  </div>
)

// ── Submit button ───────────────────────────────────────────
const SubmitBtn = ({ children }) => (
  <button
    type="submit"
    className="w-full py-3 rounded-xl font-bold text-white relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 mt-2 group"
    style={{
      background: '#2B6CB0',
      border: 'none',
      fontFamily: 'Amiri, serif',
      fontSize: '1rem',
      boxShadow: '0 4px 16px rgba(43,108,176,0.3)',
      cursor: 'pointer'
    }}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
  </button>
)

// ── Error banner ────────────────────────────────────────────
const Banner = ({ message }) =>
  message ? (
    <div
      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-center mb-5"
      style={{
        background: 'rgba(220,38,38,0.07)',
        border: '1px solid rgba(220,38,38,0.2)',
        color: '#dc2626'
      }}
    >
      {message}
    </div>
  ) : null

// ── Back button ─────────────────────────────────────────────
const BackBtn = ({ onClick, label = 'Zurück' }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold transition-opacity hover:opacity-100"
    style={{ color: '#2B6CB0', opacity: 0.7, background: 'none', border: 'none', cursor: 'pointer' }}
  >
    <BackIcon /> {label}
  </button>
)

// ── Google button ───────────────────────────────────────────
const GoogleBtn = ({ onSuccess }) => (
  <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(43,108,176,0.15)' }}>
    <GoogleLogin onSuccess={onSuccess} onError={() => alert('Google login failed')} width="100%" />
  </div>
)

// ── Divider ─────────────────────────────────────────────────
const Divider = ({ label = 'ODER' }) => (
  <div className="flex items-center gap-3 my-4" style={{ color: '#2f2e41', opacity: 0.35 }}>
    <div className="flex-1 h-px" style={{ background: 'rgba(43,108,176,0.12)' }} />
    <span className="text-xs font-bold tracking-widest">{label}</span>
    <div className="flex-1 h-px" style={{ background: 'rgba(43,108,176,0.12)' }} />
  </div>
)

// ════════════════════════════════════════════════════════════
// FORM COMPONENT
// ════════════════════════════════════════════════════════════
const Form = ({ type, children, handleGoogleLogin }) => {
  const { setMessage, setRegisterInfo, Uapi, setUserInfo, setLogin } = useContext(Context)
  const navigate = useNavigate()

  const [vergessen, setVergessen] = useState(false)
  const [perEmail, setPerEmail] = useState(false)
  const [mes, setMes] = useState('')

  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' })
  const [register, setRegister] = useState({ name: '', email: '', password: '' })
  const [forgotInfo, setForgotInfo] = useState({ email: '', password: '', repeat: '' })

  useEffect(() => { setPerEmail(false) }, [])

  const handleLoginInput = e => setLoginInfo(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleRegisterInput = e => setRegister(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleForgotInput = e => setForgotInfo(p => ({ ...p, [e.target.name]: e.target.value }))

  const handlLogin = async e => {
    e.preventDefault()
    if (!loginInfo.email || !loginInfo.password) { setMes('Bitte alle Felder ausfüllen.'); return }
    try {
   
      await axios.get(`${Uapi}/sanctum/csrf-cookie`, { withCredentials: true })
      const res = await axiosInstance.post('/api/login', loginInfo)
    
      if (res.data.message === 'success') { setLogin(true); setUserInfo(res.data.user); navigate('/') }
      else setMes(res.data.message)
    } catch { setMes('Bitte neu laden und erneut versuchen.') }
  }

  const handlCreate = async e => {
    e.preventDefault()
    if (!register.name || !register.email || !register.password) { setMes('Bitte alle Felder ausfüllen.'); return }
    try {

      await axios.get(`${Uapi}/sanctum/csrf-cookie`, { withCredentials: true })
      const res = await axiosInstance.post('/api/request-otp', register)
      console.log(res)
      if (res.data.message === 'success') { setRegisterInfo(register); navigate('/check') }
    } catch (err) { alert(err.response?.data?.message || 'Fehler beim Erstellen des Kontos') }
  }

  const handlVergessen = async e => {
    e.preventDefault()
    if (forgotInfo.password !== forgotInfo.repeat || !forgotInfo.password || !forgotInfo.email) {
      setMes('Passwörter stimmen nicht überein.'); return
    }
    try {
      await axios.get(`${Uapi}/sanctum/csrf-cookie`, { withCredentials: true })
      const res = await axiosInstance.post('/api/changePassword', forgotInfo)
      if (res.data.message === 'success') { setRegisterInfo(forgotInfo); navigate('/check') }
    } catch (err) { alert(err.response?.data?.message || 'Fehler') }
  }

  // Page background
  const pageStyle = {
    minHeight: '100vh',
    background: 'var(--main-background)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Lato, sans-serif'
  }

  // ── FORGOT PASSWORD view ────────────────────────────────
  if (vergessen) return (
    <div style={pageStyle}>
      <div className="w-full max-w-md">
        <AuthCard
          title="Neues Passwort"
          subtitle="Gib deine E-Mail und ein neues Passwort ein"
          stripeStyle="linear-gradient(90deg, #2B6CB0, #7bb3e8)"
        >
          <form onSubmit={handlVergessen}>
            <Banner message={mes} />
            <Field label="E-Mail" icon={<MailIcon />} type="email" name="email" placeholder="name@beispiel.de" onChange={handleForgotInput} required />
            <Field label="Neues Passwort" icon={<LockIcon />} type="password" name="password" placeholder="••••••••" onChange={handleForgotInput} required />
            <Field label="Passwort wiederholen" icon={<LockIcon />} type="password" name="repeat" placeholder="••••••••" onChange={handleForgotInput} required />
            <SubmitBtn>Speichern</SubmitBtn>
          </form>
          <BackBtn onClick={() => { setVergessen(false); setMes('') }} />
        </AuthCard>
      </div>
    </div>
  )

  // ── REGISTER view ───────────────────────────────────────
  if (type === 'register') return (
    <div style={pageStyle}>
      <div className="w-full max-w-md">
        <AuthCard
          title="Konto erstellen"
          subtitle="Starte deine Lernreise noch heute"
          stripeStyle="linear-gradient(90deg, #16355a, #2B6CB0)"
          footer={
            <span style={{ color: '#2f2e41', opacity: 0.6 }}>
              Bereits ein Konto?{' '}
              <button
                onClick={() => navigate('/login')}
                style={{ color: '#2B6CB0', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Anmelden
              </button>
            </span>
          }
        >
          <form onSubmit={handlCreate}>
            <Banner message={mes} />
            <Field label="Name" icon={<UserIcon />} type="text" name="name" placeholder="Dein Name" onChange={handleRegisterInput} required />
            <Field label="E-Mail" icon={<MailIcon />} type="email" name="email" placeholder="name@beispiel.de" onChange={handleRegisterInput} required />
            <Field label="Passwort" icon={<LockIcon />} type="password" name="password" placeholder="••••••••" onChange={handleRegisterInput} required />
            <SubmitBtn>Konto erstellen →</SubmitBtn>
          </form>
        </AuthCard>
      </div>
    </div>
  )

  // ── LOGIN — email mode ──────────────────────────────────
  if (perEmail) return (
    <div style={pageStyle}>
      <div className="w-full max-w-md">
        <AuthCard
          title="Willkommen zurück"
          subtitle="Melde dich mit deiner E-Mail an"
          footer={
            <span style={{ color: '#2f2e41', opacity: 0.6 }}>
              Noch kein Konto?{' '}
              <button
                onClick={() => navigate('/createAcount')}
                style={{ color: '#2B6CB0', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Konto erstellen
              </button>
            </span>
          }
        >
          <form onSubmit={handlLogin}>
            <Banner message={mes} />
            <Field label="E-Mail" icon={<MailIcon />} type="email" name="email" placeholder="name@beispiel.de" onChange={handleLoginInput} required />
            <div className="mb-1">
              <Field label="Passwort" icon={<LockIcon />} type="password" name="password" placeholder="••••••••" onChange={handleLoginInput} required />
              <button
                type="button"
                onClick={() => { setVergessen(true); setMes('') }}
                className="text-xs font-bold block text-right w-full -mt-2 mb-3 transition-opacity hover:opacity-100"
                style={{ color: '#2B6CB0', opacity: 0.7, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Passwort vergessen?
              </button>
            </div>
            <SubmitBtn>Anmelden</SubmitBtn>
          </form>
          <BackBtn onClick={() => { setPerEmail(false); setMes('') }} label="Zurück zu den Optionen" />
        </AuthCard>
      </div>
    </div>
  )

  // ── LOGIN — Google choice (default) ────────────────────
  return (
    <div style={pageStyle}>
      <div className="w-full max-w-md">
        <AuthCard
          title="Willkommen zurück"
          subtitle="Melde dich an, um weiterzulernen"
          footer={
            <span style={{ color: '#2f2e41', opacity: 0.6 }}>
              Noch kein Konto?{' '}
              <button
                onClick={() => navigate('/createAcount')}
                style={{ color: '#2B6CB0', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Konto erstellen
              </button>
            </span>
          }
        >
          {handleGoogleLogin && <GoogleBtn onSuccess={handleGoogleLogin} />}
          <Divider />
          <button
            type="button"
            onClick={() => setPerEmail(true)}
            className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(43,108,176,0.2)',
              color: '#2B6CB0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'Lato, sans-serif'
            }}
          >
            <MailIcon /> Mit E-Mail anmelden
          </button>
        </AuthCard>
      </div>
    </div>
  )
}

export default Form
