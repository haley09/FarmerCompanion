import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero" aria-labelledby="landing-heading">
        <div className="landing-copy">
          <p className="eyebrow">Farmer Companion</p>
          <h1 id="landing-heading">Run the season from one farm desk</h1>
          <p>
            Track field profitability, input costs, weather, market targets,
            equipment service, tasks, and printable planning reports in one
            practical dashboard.
          </p>

          <div className="landing-actions">
            <Link to="/dashboard" className="primary-button">
              Open preview dashboard
            </Link>
            <Link to="/register" className="ghost-button landing-auth-link">
              Create account
            </Link>
            <Link to="/login" className="landing-login-link">
              Log in
            </Link>
          </div>
        </div>

        <div className="landing-panel" aria-label="Dashboard highlights">
          <div>
            <span>Total Acres</span>
            <strong>182</strong>
          </div>
          <div>
            <span>Projected Net</span>
            <strong>$85.4k</strong>
          </div>
          <div>
            <span>Priority Alerts</span>
            <strong>4</strong>
          </div>
          <div>
            <span>Planning Year</span>
            <strong>2026</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
