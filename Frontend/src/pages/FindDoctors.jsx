import Card from "../components/Card.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { doctors, clinics } from "../data/mock.js";
import "./FindDoctors.css";

const reasons = [
  { icon: "📈", title: "Your Sugar Levels", text: "Since your recent labs showed a slight rise in sugar levels, we found doctors who are great at managing this." },
  { icon: "⚡", title: "Vitamin & Energy Needs", text: "Dr. Chen is an expert in helping restore vitamin D levels you've been feeling lately." },
  { icon: "👥", title: "Your Care Team", text: "Dr. Wilson works at Mount Sinai, where you had care before, making it easy to share your history." },
];

export default function FindDoctors() {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Finding the right doctor for you</h1>
          <p>
            We&apos;ve looked at your health profile and recent lab results to suggest the best
            specialists for your specific needs.
          </p>
        </div>
        <div className="row">
          <span className="match-chip">94%</span>
          <div>
            <strong className="tiny">Top Match Scores</strong>
            <p className="tiny muted">Best matches for you</p>
          </div>
        </div>
      </div>

      <Card className="finder">
        <label className="search finder-search">
          <span aria-hidden="true">🔍</span>
          <input placeholder="Search for a doctor or specialty near you..." />
        </label>
        <div className="finder-filters">
          <select defaultValue="all">
            <option value="all">All Specialities</option>
            <option value="cardio">Cardiology</option>
            <option value="endo">Endocrinology</option>
          </select>
          <select defaultValue="easy">
            <option value="easy">Easy Booking</option>
            <option value="today">Available Today</option>
          </select>
          <button className="btn btn--ghost btn--sm">⚙ Filter Results</button>
        </div>
      </Card>

      <div className="doctor-layout">
        <div className="doctor-main">
          <Card
            title="♥ Doctors We Recommend Most"
            action={
              <a className="link" href="#all">
                See All Doctors →
              </a>
            }
          >
            <div className="doctor-grid">
              {doctors.map((doctor) => (
                <article key={doctor.name} className="doctor">
                  <span className="badge badge--green doctor-match">{doctor.match}</span>
                  <div className="row">
                    <span className="avatar avatar--lg">{doctor.initials}</span>
                    <div>
                      <h3>{doctor.name}</h3>
                      <p className="tiny muted">{doctor.specialty}</p>
                      <p className="tiny muted">
                        {doctor.rating} · {doctor.reviews}
                      </p>
                    </div>
                  </div>
                  <div className="doctor-tags">
                    {doctor.tags.map((tag) => (
                      <span key={tag} className="badge badge--outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="doctor-actions">
                    <button className="btn btn--primary btn--sm">Book Now</button>
                    <button className="btn btn--ghost btn--sm">View Profile</button>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card title="📍 Nearby Clinics & Hospitals" className="card--flush">
            <div className="clinic-split">
              <div className="clinic-map" aria-hidden="true">
                <span className="pin pin--1">Mount Sinai Hospital</span>
                <span className="pin pin--2">City Wellness Clinic</span>
              </div>
              <div className="clinic-list">
                <p className="tiny label-caps">Locations Near You</p>
                {clinics.map((clinic) => (
                  <article key={clinic.name} className="clinic">
                    <strong>{clinic.name}</strong>
                    <p className="tiny muted">📍 {clinic.distance}</p>
                    <span className={`tiny status status--${clinic.tone}`}>● {clinic.status}</span>
                  </article>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <aside className="doctor-side">
          <Card className="why-card">
            <span className="icon-box">🩺</span>
            <h2 style={{ marginTop: 12 }}>Why we picked these doctors</h2>
            <div className="why-list">
              {reasons.map((reason) => (
                <article key={reason.title} className="why">
                  <span className="icon-box icon-box--green">{reason.icon}</span>
                  <div>
                    <strong>{reason.title}</strong>
                    <p className="tiny muted">{reason.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="tiny muted center">Safe &amp; private AI health analysis</p>
          </Card>

          <Card title="Ready to Book?">
            <div className="spread">
              <span className="tiny muted">Profile Progress</span>
              <strong className="tiny">92%</strong>
            </div>
            <ProgressBar value={92} />
            <ul className="ready-list">
              <li>✅ Your lab results are ready to share</li>
              <li>✅ Insurance is confirmed for your area</li>
            </ul>
          </Card>

          <div className="promo">
            <p className="tiny">NEW FOR YOU</p>
            <strong>Join a new Diabetes Wellness Program near you</strong>
            <a className="link promo-link" href="#program">
              Learn more →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
