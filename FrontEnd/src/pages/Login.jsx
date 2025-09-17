import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlog from "../context/useBlog";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { login } = useBlog();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/admin");
    } else {
      setError(t("error"));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("button")}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>{t("username")}</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>{t("password")}</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          {t("button")}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "4rem auto",
    padding: "2rem",
    backgroundColor: "#1c1c1c",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
    color: "#e0e0e0",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.8rem",
    color: "#00d4ff",
    letterSpacing: "1px",
  },
  formGroup: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.3rem",
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#e0e0e0",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "0.5rem 0.75rem",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    backgroundColor: "#00d4ff",
    border: "1px solid #00aacc",
    color: "#121212",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  error: {
    marginTop: "0.5rem",
    textAlign: "center",
    color: "red",
  },
};
