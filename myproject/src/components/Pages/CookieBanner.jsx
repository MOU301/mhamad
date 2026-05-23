import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("gdpr_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("gdpr_cookie_consent", "accepted");
    setVisible(false);
    window.location.reload();
  };

  const rejectCookies = () => {
    localStorage.setItem("gdpr_cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--second-background)] text-center p-4 z-50">
      <p className="text-white opacity-80 ">
       Wir verwenden Cookies für Anmeldung und Analyse. Lesen Sie unsere <NavLink to="/cookie" className="mx-1" style={{color:"#4ea5ff"}}>Cookie Policy</NavLink>.
      </p>
      <div className="text-center space-x-5 mt-5">
        <button className="bg-[var(--main-color)] text-white px-4 py-2 rounded hover:bg-white hover:text-[var(--main-color)]" onClick={acceptCookies}>Akzeptieren</button>
        <button  className="bg-white text-[var(--main-color)] px-4 py-2 rounded hover:bg-[var(--main-color)] hover:text-white" onClick={rejectCookies} >Ablehnen</button>
      </div>
    </div>
  );
};

export default CookieBanner;
