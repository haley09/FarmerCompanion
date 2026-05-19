import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  role: "owner",
};

export default function RegisterPage() {
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

    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match.");
      setMessageTone("error");
      return;
    }

    setIsSubmitting(true);

    try {
      if (api.isConfigured) {
        await api.post("/auth/register/", formData);
      }

      setFormData(initialFormData);
      setMessage(
        api.isConfigured
          ? "Account created. You can now log in and start setting up your farm dashboard."
          : "Demo account ready. Continue to login to open the dashboard."
      );
      setMessageTone("success");
      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("authMode", api.isConfigured ? "api" : "demo");
      window.setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      setMessage("Registration failed. Please check your details and try again.");
      setMessageTone("error");
      console.error(error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell" aria-labelledby="register-heading">
        <div className="auth-intro">
          <p className="eyebrow">Farmer Companion</p>
          <h1 id="register-heading">Create your farm workspace</h1>
          <p>
            Save field records, track equipment, watch markets, and keep your
            season planning in one practical dashboard.
          </p>
          {!api.isConfigured && (
            <p className="auth-note">
              Demo mode is active because no backend API URL is configured.
            </p>
          )}

          <div className="auth-benefits" aria-label="Account benefits">
            <span>Field and crop planning</span>
            <span>Equipment service tracking</span>
            <span>Market and cost snapshots</span>
          </div>
        </div>

        <form className="auth-form panel" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <p className="section-kicker">Register</p>
            <h2>Start with the basics</h2>
          </div>

          <label>
            Full name
            <input
              type="text"
              name="name"
              placeholder="Jane Miller"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

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
            Account type
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="owner">Owner</option>
              <option value="employee">Employee</option>
            </select>
          </label>

          <div className="auth-password-grid">
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="8"
                required
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                name="confirm_password"
                placeholder="Repeat password"
                value={formData.confirm_password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="8"
                required
              />
            </label>
          </div>

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>

          {message && (
            <p className={`auth-message auth-message-${messageTone}`} role="status">
              {message}
            </p>
          )}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
