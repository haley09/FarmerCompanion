export function FarmProfile({ profile, onProfileChange }) {
  function updateProfile(key, value) {
    onProfileChange({
      ...profile,
      [key]: key === "planningYear" ? Number(value) || "" : value,
    });
  }

  return (
    <section className="panel profile-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Profile</p>
          <h2>Farm Profile</h2>
        </div>
        <span className="badge">Saved in browser</span>
      </div>

      <div className="profile-grid">
        <label>
          Farm name
          <input
            value={profile.farmName}
            placeholder="Maple Row Farms"
            onChange={(event) => updateProfile("farmName", event.target.value)}
          />
        </label>
        <label>
          Operator
          <input
            value={profile.operatorName}
            placeholder="Name"
            onChange={(event) =>
              updateProfile("operatorName", event.target.value)
            }
          />
        </label>
        <label>
          Planning year
          <input
            type="number"
            min="2000"
            value={profile.planningYear}
            onChange={(event) =>
              updateProfile("planningYear", event.target.value)
            }
          />
        </label>
        <label>
          Primary crops
          <input
            value={profile.primaryCrops}
            placeholder="Corn, soybeans"
            onChange={(event) =>
              updateProfile("primaryCrops", event.target.value)
            }
          />
        </label>
        <label className="profile-notes">
          Notes
          <textarea
            value={profile.notes}
            rows="3"
            onChange={(event) => updateProfile("notes", event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
