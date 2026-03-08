import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Home.css';

const features = [
  {
    icon: '🔬',
    title: 'Research Management',
    description: 'Organize and track your research progress with structured timelines and milestone tracking.',
  },
  {
    icon: '🤝',
    title: 'Supervisor Collaboration',
    description: 'Seamlessly communicate with supervisors, submit drafts, and receive feedback in one place.',
  },
  {
    icon: '📊',
    title: 'Progress Analytics',
    description: 'Visualize your project progress with insightful charts and milestone completion reports.',
  },
  {
    icon: '📁',
    title: 'Document Repository',
    description: 'Store all project documents, reports, and references in a centralized repository.',
  },
  {
    icon: '🗓️',
    title: 'Deadline Tracking',
    description: 'Never miss a submission deadline with automated reminders and calendar integrations.',
  },
  {
    icon: '🏆',
    title: 'Project Showcase',
    description: 'Present your completed project to the academic community with a polished portfolio page.',
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Final Year Project Portal</span>
          <h1 className="hero-title">
            Manage Your <span className="highlight">FYP Journey</span> With Ease
          </h1>
          <p className="hero-subtitle">
            A comprehensive platform for students, supervisors, and administrators to collaborate,
            track progress, and successfully complete final year projects.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Sign In
                </Link>
              </>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>500+</strong>
              <span>Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>120+</strong>
              <span>Supervisors</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>98%</strong>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-header">
              <span className="card-dot red" />
              <span className="card-dot yellow" />
              <span className="card-dot green" />
            </div>
            <div className="card-body">
              <div className="progress-item">
                <span>Literature Review</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '90%' }} /></div>
                <span className="pct">90%</span>
              </div>
              <div className="progress-item">
                <span>Implementation</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '65%' }} /></div>
                <span className="pct">65%</span>
              </div>
              <div className="progress-item">
                <span>Testing</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '40%' }} /></div>
                <span className="pct">40%</span>
              </div>
              <div className="progress-item">
                <span>Documentation</span>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '20%' }} /></div>
                <span className="pct">20%</span>
              </div>
              <div className="card-footer-note">📅 Next deadline: May 15, 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Everything You Need</h2>
          <p>Powerful tools to help you manage your final year project from start to finish.</p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Start Your FYP Journey?</h2>
        <p>Join hundreds of students already using the portal to manage their final year projects.</p>
        {!user && (
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Your Account
          </Link>
        )}
      </section>
    </div>
  );
}
