import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="landing-page">
      <div className="landing-card">
        <p className="eyebrow">Farmer Companion</p>
        <h1>One stop shop for all your farming needs</h1>
        <p className="landing-text">Farmer Companion is a comprehensive platform designed to support farmers in managing their agricultural activities.
             It offers a range of features including crop management, weather forecasting, market price tracking, and access to agricultural resources. 
             Whether you're a small-scale farmer or a large agricultural enterprise, Farmer Companion provides the tools and information you need to 
             optimize your farming operations and increase productivity.
        </p>

        <div className="landing-actions">
          <Link to="/login" className="primary-button">
            Login
          </Link>
          <Link to="/register" className="secondary-button">
            Register
          </Link>
        </div>

        <div className="landing-grid">
          <div className="landing-feature">
            <h2>For Farmers</h2>
            <p>Manage your crops, access weather forecasts, and track market prices.</p>
          </div>
          <div className="landing-feature">
            <h2>For Agricultural Experts</h2>
            <p>Share knowledge, provide guidance, and connect with the farming community.</p>
          </div>
        </div>

      </div>
    </section>
  );
}