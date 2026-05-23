import React from "react";

const DomainChange = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>We’ve moved to a new domain 🎉</h1>

        <p style={styles.text}>
          Our website domain has changed.
        </p>

        <p style={styles.text}>
          <strong>Old domain:</strong> foryou.com.de <br />
          <strong>New domain:</strong>{" "}
          <span style={styles.newDomain}>foryoulearn.com</span>
        </p>

        <p style={styles.text}>
          Please update your bookmarks and always use our new official website
          to access your account and courses.
        </p>

        <a
          href="https://foryoulearn.com"
          style={styles.button}
        >
          Go to foryoulearn.com
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    padding: "20px",
  },
  card: {
    maxWidth: "520px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    color: "#222",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "16px",
    lineHeight: "1.6",
  },
  newDomain: {
    color: "#1d4ed8",
    fontWeight: "bold",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#1d4ed8",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default DomainChange;
