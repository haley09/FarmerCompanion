import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const initialFormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("neutral");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setMessageTone("neutral");
    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/login/", formData);

      if (response?.access) {
        localStorage.setItem("access", response.access);
      }

      if (response?.refresh) {
        localStorage.setItem("refresh", response.refresh);
      }

      localStorage.setItem("userEmail", formData.email);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Login failed. Please check your email and password.");
      setMessageTone("error");
      console.error(error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-labelledby="login-heading">
        <div className="auth-intro">
          <p className="eyebrow">Farmer Companion</p>
          <h1 id="login-heading">Welcome back to the farm desk</h1>
          <p>
            Pick up where you left off with field planning, input costs,
            equipment reminders, weather, and market snapshots.
          </p>

          <div className="auth-benefits" aria-label="Dashboard highlights">
            <span>Saved browser workspace</span>
            <span>Planning reports</span>
            <span>Daily operating view</span>
          </div>
        </div>

        <form className="auth-form panel" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <p className="section-kicker">Login</p>
            <h2>Open your dashboard</h2>
          </div>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>

          {message && (
            <p className={`auth-message auth-message-${messageTone}`} role="status">
              {message}
            </p>
          )}

          <p className="auth-switch">
            New to Farmer Companion? <Link to="/register">Create account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
