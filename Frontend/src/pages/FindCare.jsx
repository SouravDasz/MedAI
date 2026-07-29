import { useState } from 'react';
import VitalitySidebar from '../components/VitalitySidebar';
import '../styles/find-care.css';

const providers = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    specialty: 'Primary Care Physician',
    address: 'Mercy Health Clinic, 420 Oak Street, Springfield',
    distance: '1.2 mi',
    rating: 4.9,
    reviews: 312,
    tags: [
      { label: 'Accepting new patients', kind: 'green' },
      { label: 'Same-day visits', kind: 'blue' },
      { label: 'Telehealth', kind: 'amber' },
    ],
    photo: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  },
  {
    id: 2,
    name: 'Dr. Marcus Bell',
    specialty: 'Cardiologist',
    address: 'Heart & Vascular Center, 88 Pine Ave, Springfield',
    distance: '2.8 mi',
    rating: 4.8,
    reviews: 198,
    tags: [
      { label: 'Accepting new patients', kind: 'green' },
      { label: 'Next: Thu 10:30 AM', kind: 'blue' },
    ],
    photo: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    specialty: 'Pediatrician',
    address: 'Sunrise Family Clinic, 15 Maple Lane, Riverside',
    distance: '3.4 mi',
    rating: 4.9,
    reviews: 421,
    tags: [
      { label: 'Accepting new patients', kind: 'green' },
      { label: 'Telehealth', kind: 'amber' },
    ],
    photo: 'https://images.pexels.com/photos/8629135/pexels-photo-8629135.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  },
  {
    id: 4,
    name: 'Dr. James Okoro',
    specialty: 'Dermatologist',
    address: 'ClearSkin Dermatology, 210 Birch Rd, Springfield',
    distance: '4.1 mi',
    rating: 4.7,
    reviews: 156,
    tags: [
      { label: 'Waitlist: 2 weeks', kind: 'amber' },
      { label: 'Telehealth', kind: 'amber' },
    ],
    photo: 'https://images.pexels.com/photos/5722164/pexels-photo-5722164.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  },
  {
    id: 5,
    name: 'Dr. Elena Rossi',
    specialty: 'OB-GYN',
    address: "Women's Wellness Center, 77 Cedar St, Springfield",
    distance: '4.6 mi',
    rating: 4.9,
    reviews: 287,
    tags: [
      { label: 'Accepting new patients', kind: 'green' },
      { label: 'Next: Mon 9:00 AM', kind: 'blue' },
    ],
    photo: 'https://images.pexels.com/photos/8376196/pexels-photo-8376196.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  },
  {
    id: 6,
    name: 'Dr. Kevin Patel',
    specialty: 'Orthopedic Surgeon',
    address: 'Motion Orthopedics, 305 Elm Court, Riverside',
    distance: '5.3 mi',
    rating: 4.6,
    reviews: 134,
    tags: [
      { label: 'Referral required', kind: 'amber' },
      { label: 'Next: Wed 2:15 PM', kind: 'blue' },
    ],
    photo: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
  },
];

const specialties = ['Primary Care', 'Cardiology', 'Pediatrics', 'Dermatology', 'OB-GYN', 'Orthopedics', 'Mental Health'];

const StarIcon = () => (
  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
    <path d="m12 2 2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z" />
  </svg>
);

export default function FindCare() {
  const [activeSpec, setActiveSpec] = useState('Primary Care');
  const [radius, setRadius] = useState(10);
  const [insurance, setInsurance] = useState(true);
  const [telehealth, setTelehealth] = useState(false);

  return (
    <div className="fc-page">
      <VitalitySidebar />
      <main className="fc-main">
        <header className="fc-topbar">
          <div className="fc-topbar__left">
            <h1 className="fc-topbar__title">Find Care</h1>
            <span className="fc-topbar__location">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Springfield, IL
            </span>
          </div>
          <div className="fc-topbar__right">
            <button className="fc-topbar__btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-3z" />
              </svg>
              Saved (3)
            </button>
            <button className="fc-topbar__btn fc-topbar__btn--primary">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Book Appointment
            </button>
          </div>
        </header>

        <div className="fc-search">
          <div className="fc-search__field">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              className="fc-search__input"
              placeholder="Search by doctor, specialty, or condition…"
            />
          </div>
          <button className="fc-search__loc">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            Use my current location
          </button>
        </div>

        <div className="fc-body">
          <aside className="fc-filters">
            <div className="fc-filters__group">
              <div className="fc-filters__heading">
                Specialty
                <span className="fc-filters__count">{specialties.length}</span>
              </div>
              <div className="fc-chips">
                {specialties.map((s) => (
                  <button
                    key={s}
                    className={`fc-chip${activeSpec === s ? ' fc-chip--active' : ''}`}
                    onClick={() => setActiveSpec(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="fc-filters__group">
              <div className="fc-filters__heading">Distance</div>
              <div className="fc-range">
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                />
                <span className="fc-range__val">{radius} mi</span>
              </div>
            </div>

            <div className="fc-filters__group">
              <div className="fc-filters__heading">Availability</div>
              <label className="fc-check">
                <input type="checkbox" checked={telehealth} onChange={(e) => setTelehealth(e.target.checked)} />
                Telehealth visits
              </label>
              <label className="fc-check">
                <input type="checkbox" />
                Same-day appointments
              </label>
              <label className="fc-check">
                <input type="checkbox" />
                Accepting new patients
              </label>
            </div>

            <div className="fc-filters__group">
              <div className="fc-filters__heading">Insurance</div>
              <label className="fc-check">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                />
                In-network with my plan
              </label>
              <label className="fc-check">
                <input type="checkbox" />
                Self-pay / uninsured
              </label>
            </div>

            <div className="fc-filters__actions">
              <button className="fc-filters__clear">Clear all</button>
              <button className="fc-filters__apply">Apply filters</button>
            </div>
          </aside>

          <section className="fc-results">
            <div className="fc-banner">
              <div className="fc-banner__text">
                <h3>Your insurance is active</h3>
                <p>BlueCross BlueShield PPO — in-network providers shown first.</p>
              </div>
              <button className="fc-banner__btn">View plan details</button>
            </div>

            <div className="fc-results__head">
              <div className="fc-results__count">
                <strong>{providers.length} providers</strong> near Springfield, IL
              </div>
              <div className="fc-results__sort">
                Sort by
                <select>
                  <option>Closest first</option>
                  <option>Highest rated</option>
                  <option>Earliest availability</option>
                </select>
              </div>
            </div>

            <div className="fc-cards">
              {providers.map((p) => (
                <article key={p.id} className="fc-card">
                  <div className="fc-card__avatar">
                    <img src={p.photo} alt={p.name} />
                  </div>
                  <div className="fc-card__body">
                    <div className="fc-card__top">
                      <div>
                        <div className="fc-card__name">{p.name}</div>
                        <div className="fc-card__specialty">{p.specialty}</div>
                      </div>
                      <div className="fc-card__rating">
                        <StarIcon />
                        {p.rating}
                        <span>({p.reviews})</span>
                      </div>
                    </div>
                    <div className="fc-card__addr">
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      {p.address}
                    </div>
                    <div className="fc-card__tags">
                      {p.tags.map((t) => (
                        <span key={t.label} className={`fc-card__tag${t.kind ? ` fc-card__tag--${t.kind}` : ''}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                    <div className="fc-card__footer">
                      <span className="fc-card__dist">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {p.distance} away
                      </span>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="fc-card__cta fc-card__cta--ghost">Profile</button>
                        <button className="fc-card__cta">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
