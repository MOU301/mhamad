import React from "react";

const Email = () => {
  return (
    <table
      width="100%"
      cellPadding="0"
      cellSpacing="0"
      style={{ padding: "30px 0", backgroundColor: "#f3f0e6" }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              
              cellPadding="0"
              cellSpacing="0"
              style={{
                background: "#ffffff",
                borderRadius: "8px",
                overflow: "hidden",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              <tbody>
                {/* Header */}
                <tr>
                  <td
                    style={{
                      background: "#1A202C",
                      padding: "20px",
                      textAlign: "center",
                      color: "#ffffff",
                    }}
                  >
                     <div  className="logo ">
                        <strong><span className='text-main'>For</span><span className='text-second'>You</span></strong>
                        <span className='learn'>learn</span></div>
                    <p style={{ margin: "5px 0 0", fontSize: "14px" ,color:"#2f6fb2"}}>
                      Deutsch lernen leicht gemacht
                    </p>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td style={{ padding: "30px", color: "#333333" }}>
                    <h2 style={{ marginTop: 0, color: "#2f6fb2" }}>
                      Hallo Mohammad 👋
                    </h2>

                    <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                      Vielen Dank für deine Anfrage bei{" "}
                      <strong>ForYou Learn</strong>.
                    </p>

                    <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                      Dein Bestätigungscode (OTP) lautet:
                    </p>

                    <div
                      style={{
                        margin: "20px 0",
                        padding: "15px",
                        background: "#f3f0e6",
                        textAlign: "center",
                        fontSize: "26px",
                        letterSpacing: "4px",
                        fontWeight: "bold",
                        color: "#2f6fb2",
                        borderRadius: "6px",
                      }}
                    >
                      98651
                    </div>

                    <p style={{ fontSize: "14px", color: "#666" }}>
                      Falls du diese Anfrage nicht gestellt hast, kannst du
                      diese E-Mail ignorieren.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      background: "#f3f0e6",
                      padding: "20px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#555",
                    }}
                  >
                    <p style={{ margin: 0 }}>© 2025 ForYou Learn</p>
                    <p style={{ margin: "5px 0 0" }}>
                      support@foryoulearn.com
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Email;
