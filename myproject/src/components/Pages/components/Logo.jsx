import React from 'react'

const Logo = () => {
  return (
    <div className="relative group">
        <div
              className="inline-flex items-baseline no-underline rounded-full px-4 py-1 transition-all duration-200 bg-[#16355a] "
              style={{ border: '1.5px solid rgba(43,108,176,0.45)' }}
             
            >
              <strong>
                <span style={{ color: '#7bb3e8' }}>For</span>
                <span className="text-white">You</span>
              </strong>
              <span className="text-xs font-light ml-0.5 self-center" style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.09em' }}>learn</span>
            </div>

        </div>
  )
}

export default Logo