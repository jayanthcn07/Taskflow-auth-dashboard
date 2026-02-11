import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <div style={styles.brand}>
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
            TaskFlow
          </h1>
          <p style={{ opacity: 0.7 }}>
            Modern productivity, simplified.
          </p>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={{ marginBottom: "25px" }}>
            Welcome Back
          </h2>

          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          <form onSubmit={submit}>
            <div style={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ marginTop: "20px", fontSize: "14px" }}>
            Don’t have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: "40px",
  },
  brand: {
    maxWidth: "300px",
  },
  right: {
    flex: 1,
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "360px",
    padding: "40px",
    borderRadius: "20px",
    background: "#1e293b",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
  },
  inputGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  error: {
    color: "#ef4444",
    marginBottom: "15px",
    fontSize: "14px",
  },
};
