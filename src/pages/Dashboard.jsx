import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const milestones = [
  { id: 1, title: 'Project Proposal Approved', date: 'Jan 10, 2025', done: true },
  { id: 2, title: 'Literature Review Submitted', date: 'Feb 5, 2025', done: true },
  { id: 3, title: 'Design Document Submitted', date: 'Mar 1, 2025', done: true },
  { id: 4, title: 'Mid-term Presentation', date: 'Mar 28, 2025', done: false },
  { id: 5, title: 'Final Implementation', date: 'May 10, 2025', done: false },
  { id: 6, title: 'Final Report Submission', date: 'May 25, 2025', done: false },
];

const recentActivities = [
  { icon: '📝', text: 'Supervisor left a comment on Chapter 2', time: '2 hours ago' },
  { icon: '✅', text: 'Milestone "Literature Review" marked complete', time: '1 day ago' },
  { icon: '📎', text: 'New document uploaded: Design_v3.pdf', time: '2 days ago' },
  { icon: '🗓️', text: 'Meeting scheduled with supervisor for Mar 25', time: '3 days ago' },
];

export default function Dashboard() {
  const { user } = useAuth();

  const completedCount = milestones.filter((m) => m.done).length;
  const progressPct = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name || 'Student'}! 👋</h1>
            <p className="dash-subtitle">
              Here&apos;s your FYP progress overview.
            </p>
          </div>
          <Link to="/projects" className="dash-btn">
            View Projects
          </Link>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Overall Progress</div>
            <div className="stat-value">{progressPct}%</div>
            <div className="stat-bar">
              <div className="stat-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Milestones Completed</div>
            <div className="stat-value">{completedCount} / {milestones.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Days Until Deadline</div>
            <div className="stat-value deadline">78</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending Feedback</div>
            <div className="stat-value">2</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Milestones */}
          <div className="dash-section">
            <h2 className="section-title">Project Milestones</h2>
            <div className="milestones-list">
              {milestones.map((m, idx) => (
                <div key={m.id} className={`milestone-item ${m.done ? 'done' : ''}`}>
                  <div className="milestone-marker">
                    <div className="milestone-dot">{m.done ? '✓' : idx + 1}</div>
                    {idx < milestones.length - 1 && <div className="milestone-line" />}
                  </div>
                  <div className="milestone-info">
                    <div className="milestone-title">{m.title}</div>
                    <div className="milestone-date">📅 {m.date}</div>
                  </div>
                  <span className={`milestone-badge ${m.done ? 'badge-done' : 'badge-pending'}`}>
                    {m.done ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dash-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivities.map((a, i) => (
                <div key={i} className="activity-item">
                  <span className="activity-icon">{a.icon}</span>
                  <div className="activity-body">
                    <p>{a.text}</p>
                    <span className="activity-time">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">📄 Upload Document</button>
                <button className="action-btn">✉️ Message Supervisor</button>
                <button className="action-btn">🗓️ Schedule Meeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
