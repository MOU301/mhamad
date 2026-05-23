import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../Context/Context'
import axiosInstance from '../../API/Api'

const MailIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2B6CB0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const RESEND_SECONDS = 30

const CheckEmail = () => {
  const { registerInfo } = useContext(Context)
  const navigate = useNavigate()

  const [digits, setDigits] = useState(['', '', '', '', ''])
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(RESEND_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (!registerInfo) navigate('/createAcount')
  }, [])

  // Countdown timer
  useEffect(() => {
    if (canResend) return
    if (countdown <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, canResend])

  const handleDigitChange = (i, val) => {
    const clean = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = clean
    setDigits(next)
    if (clean && i < 4) inputRefs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus()
    }
  }

  const handlePaste = e => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5)
    const next = [...digits]
    ;[...pasted].forEach((ch, j) => { next[j] = ch })
    setDigits(next)
    inputRefs.current[Math.min(pasted.length, 4)]?.focus()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < 5) { setError('Bitte alle 5 Stellen eingeben.'); return }
    setError('')
    try {
      const data = { otp: code, email: registerInfo.email }
      const res = registerInfo.repeat
        ? await axiosInstance.post('/api/verifyChange', data)
        : await axiosInstance.post('/api/verify-otp', data)
      if (res.data.message === 'success') navigate('/login')
      else setError(res.data.message || 'Ungültiger Code.')
    } catch {
      setError('Ungültiger Code. Bitte erneut versuchen.')
    }
  }

  const handleResend = async () => {
    await axiosInstance.post('/api/request-otp', registerInfo)
    setCanResend(false)
    setCountdown(RESEND_SECONDS)
    setDigits(['', '', '', '', ''])
    setError('')
    inputRefs.current[0]?.focus()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
      style={{ background: 'var(--main-background)', fontFamily: 'Lato, sans-serif' }}
    >
      {/* Background blobs */}
      <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(43,108,176,0.07)' }} />
      <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'rgba(22,53,90,0.05)' }} />

      <div
        className="w-full max-w-sm rounded-3xl overflow-hidden relative z-10"
        style={{
          background: 'white',
          border: '1px solid rgba(43,108,176,0.1)',
          boxShadow: '0 20px 60px rgba(22,53,90,0.1)'
        }}
      >
        {/* Top stripe */}
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #2B6CB0, #16355a)' }} />

        <div className="p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-lg font-bold mb-4" style={{ color: '#16355a' }}>
              for<span style={{ color: '#2B6CB0' }}>you</span>learn
            </div>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(43,108,176,0.1)', border: '1px solid rgba(43,108,176,0.2)' }}
            >
              <MailIcon />
            </div>

            <h1 className="text-2xl font-bold mb-2" style={{ color: '#16355a', fontFamily: 'Amiri, serif' }}>
              Prüfe deine E-Mail
            </h1>
            <p className="text-xs leading-relaxed" style={{ color: '#2f2e41', opacity: 0.5 }}>
              Wir haben einen 5-stelligen Code an<br />
              <span className="font-bold" style={{ color: '#2B6CB0', opacity: 1 }}>
                {registerInfo?.email}
              </span>{' '}
              gesendet
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="text-sm font-semibold text-center px-4 py-2.5 rounded-xl mb-4"
              style={{
                background: 'rgba(220,38,38,0.07)',
                border: '1px solid rgba(220,38,38,0.2)',
                color: '#dc2626'
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* OTP digit boxes */}
            <div className="flex gap-2.5 justify-center mb-6" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => inputRefs.current[i] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleDigitChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="text-center text-2xl font-bold rounded-xl outline-none transition-all duration-200"
                  style={{
                    width: '52px',
                    height: '58px',
                    border: `1.5px solid ${d ? 'rgba(43,108,176,0.4)' : 'rgba(43,108,176,0.15)'}`,
                    background: d ? 'white' : '#f8f7f3',
                    color: '#16355a',
                    caretColor: '#2B6CB0',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#2B6CB0'
                    e.target.style.background = 'white'
                    e.target.style.boxShadow = '0 0 0 3px rgba(43,108,176,0.1)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = d ? 'rgba(43,108,176,0.4)' : 'rgba(43,108,176,0.15)'
                    e.target.style.background = d ? 'white' : '#f8f7f3'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: '#2B6CB0',
                border: 'none',
                fontFamily: 'Amiri, serif',
                fontSize: '1rem',
                boxShadow: '0 4px 16px rgba(43,108,176,0.3)',
                cursor: 'pointer'
              }}
            >
              <span className="relative z-10">Bestätigen →</span>
              <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </form>

          {/* Resend */}
          <div className="text-center mt-5">
            <span className="text-xs" style={{ color: '#2f2e41', opacity: 0.5 }}>
              Keinen Code erhalten?{' '}
            </span>
            <button
              onClick={handleResend}
              disabled={!canResend}
              className="text-xs font-bold transition-opacity"
              style={{
                color: '#2B6CB0',
                background: 'none',
                border: 'none',
                cursor: canResend ? 'pointer' : 'default',
                opacity: canResend ? 1 : 0.35
              }}
            >
              Erneut senden
            </button>
            {!canResend && (
              <div className="text-xs font-bold mt-1" style={{ color: '#2B6CB0' }}>
                Erneut senden in {countdown}s
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckEmail