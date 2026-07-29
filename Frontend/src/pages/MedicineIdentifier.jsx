import { useState } from 'react';
import VitalitySidebar from '../components/VitalitySidebar';
import '../styles/medicineIdentifier.css';
// D:\MedAI\MedAI\Frontend\src\styles\medicineIdentifier.css
const medicines = [
  {
    id: 1,
    name: 'Acetaminophen 500mg',
    brand: 'Tylenol',
    shape: 'oval',
    color: '#fef3c7',
    imprint: 'L484',
    strength: '500 mg',
    uses: 'Pain reliever and fever reducer. Used for headaches, muscle aches, and mild arthritis pain.',
    warning: 'Maximum 3,000 mg per day',
    shapeClass: '',
  },
  {
    id: 2,
    name: 'Ibuprofen 200mg',
    brand: 'Advil',
    shape: 'round',
    color: '#fecaca',
    imprint: 'ADVIL',
    strength: '200 mg',
    uses: 'NSAID for pain, inflammation, and fever. Take with food to reduce stomach upset.',
    warning: 'Take with food',
    shapeClass: 'mi-card__pill--round',
  },
  {
    id: 3,
    name: 'Amoxicillin 500mg',
    brand: 'Amoxil',
    shape: 'capsule',
    color: '#bfdbfe',
    imprint: 'AMOX 500',
    strength: '500 mg',
    uses: 'Penicillin antibiotic used to treat bacterial infections such as strep throat and ear infections.',
    warning: 'Complete full course',
    shapeClass: 'mi-card__pill--capsule',
  },
  {
    id: 4,
    name: 'Atorvastatin 20mg',
    brand: 'Lipitor',
    shape: 'oval',
    color: '#fef3c7',
    imprint: '20',
    strength: '20 mg',
    uses: 'Statin medication to lower cholesterol and reduce risk of heart disease.',
    warning: 'Take at bedtime',
    shapeClass: '',
  },
  {
    id: 5,
    name: 'Lisinopril 10mg',
    brand: 'Zestril',
    shape: 'round',
    color: '#fecaca',
    imprint: '10',
    strength: '10 mg',
    uses: 'ACE inhibitor for high blood pressure and heart failure. Helps protect kidneys in diabetics.',
    warning: 'Monitor blood pressure',
    shapeClass: 'mi-card__pill--round',
  },
  {
    id: 6,
    name: 'Metformin 500mg',
    brand: 'Glucophage',
    shape: 'oval',
    color: '#fef3c7',
    imprint: '500',
    strength: '500 mg',
    uses: 'Oral diabetes medicine that helps control blood sugar levels in type 2 diabetes.',
    warning: 'Take with meals',
    shapeClass: '',
  },
];

const colors = [
  { name: 'White', hex: '#fff' },
  { name: 'Yellow', hex: '#fef3c7' },
  { name: 'Red', hex: '#fecaca' },
  { name: 'Blue', hex: '#bfdbfe' },
  { name: 'Green', hex: '#bbf7d0' },
  { name: 'Pink', hex: '#fbcfe8' },
];

const shapes = ['Oval', 'Round', 'Capsule', 'Square', 'Octagon'];

function PillIcon() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z" />
      <path d="M8.5 8.5l7 7" />
    </svg>
  );
}

export default function MedicineIdentifier() {
  const [activeColor, setActiveColor] = useState('#fef3c7');
  const [activeShape, setActiveShape] = useState('Oval');
  const [imprint, setImprint] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className="mi-page">
      <VitalitySidebar />
      <main className="mi-main">
        <header className="mi-topbar">
          <div className="mi-topbar__left">
            <h1 className="mi-topbar__title">Medicine Identifier</h1>
            <span className="mi-topbar__subtitle">Pill lookup & drug info</span>
          </div>
          <div className="mi-topbar__right">
            <button className="mi-topbar__btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16l7-3z" />
              </svg>
              Saved searches
            </button>
            <button className="mi-topbar__btn mi-topbar__btn--primary">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Scan pill
            </button>
          </div>
        </header>

        <div className="mi-hero">
          <div className="mi-hero__inner">
            <h2 className="mi-hero__title">Identify any medication</h2>
            <p className="mi-hero__desc">Search by imprint, color, shape, or name to get detailed drug information.</p>
            <div className="mi-hero__search">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <input
                placeholder="Search by drug name or imprint code…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search</button>
            </div>
            <div className="mi-hero__tabs">
              <button className="mi-hero__tab mi-hero__tab--active">By name</button>
              <button className="mi-hero__tab">By imprint</button>
              <button className="mi-hero__tab">By appearance</button>
              <button className="mi-hero__tab">By condition</button>
            </div>
          </div>
        </div>

        <div className="mi-body">
          <div className="mi-body__inner">
            <div className="mi-filters">
              <div className="mi-filters__head">
                <div className="mi-filters__title">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  Filter by appearance
                </div>
                <button className="mi-filters__clear">Clear all</button>
              </div>
              <div className="mi-filters__grid">
                <div className="mi-field">
                  <label className="mi-field__label">Imprint code</label>
                  <input
                    className="mi-field__input"
                    placeholder="e.g. L484"
                    value={imprint}
                    onChange={(e) => setImprint(e.target.value)}
                  />
                </div>
                <div className="mi-field">
                  <label className="mi-field__label">Shape</label>
                  <div className="mi-shapes">
                    {shapes.map((s) => (
                      <button
                        key={s}
                        className={`mi-shape${activeShape === s ? ' mi-shape--active' : ''}`}
                        onClick={() => setActiveShape(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mi-field">
                  <label className="mi-field__label">Color</label>
                  <div className="mi-colors">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        className={`mi-color${activeColor === c.hex ? ' mi-color--active' : ''}`}
                        style={{ background: c.hex, border: c.hex === '#fff' ? '1px solid #cbd5e1' : 'none' }}
                        title={c.name}
                        onClick={() => setActiveColor(c.hex)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mi-results__head">
              <div className="mi-results__count">
                <strong>{medicines.length} matches</strong> found
              </div>
              <div className="mi-results__note">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                Results are for identification only — not a diagnosis.
              </div>
            </div>

            <div className="mi-cards">
              {medicines.map((m) => (
                <article key={m.id} className="mi-card">
                  <div className={`mi-card__pill${m.shapeClass ? ` ${m.shapeClass}` : ''}`}>
                    <PillIcon />
                  </div>
                  <div className="mi-card__body">
                    <div className="mi-card__name">{m.name}</div>
                    <div className="mi-card__brand">Brand: {m.brand}</div>
                    <div className="mi-card__meta">
                      <span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                        </svg>
                        {m.shape}
                      </span>
                      <span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                        Imprint: {m.imprint}
                      </span>
                      <span>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 2v20M2 12h20" />
                        </svg>
                        {m.strength}
                      </span>
                    </div>
                    <p className="mi-card__uses"><strong>Uses:</strong> {m.uses}</p>
                    <div className="mi-card__footer">
                      <span className="mi-card__warning">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <path d="M12 9v4M12 17h.01" />
                        </svg>
                        {m.warning}
                      </span>
                      <button className="mi-card__cta">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        Full info
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mi-disclaimer">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
              This tool is for identification purposes only and does not provide medical advice. Always consult a licensed pharmacist or physician before taking any medication.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
