import { useState } from 'react';
import './Projects.css';

const sampleProjects = [
  {
    id: 1,
    title: 'AI-Based Medical Diagnosis System',
    description: 'Leveraging machine learning to assist doctors in diagnosing diseases from medical imaging data.',
    supervisor: 'Dr. Sarah Khan',
    status: 'In Progress',
    tags: ['AI', 'Healthcare', 'Python'],
    progress: 65,
  },
  {
    id: 2,
    title: 'Smart Campus IoT Platform',
    description: 'An IoT-based system for monitoring and optimizing energy usage across university buildings.',
    supervisor: 'Prof. Ahmed Raza',
    status: 'Planning',
    tags: ['IoT', 'Embedded', 'Data Analytics'],
    progress: 20,
  },
  {
    id: 3,
    title: 'Blockchain-Based Academic Records',
    description: 'Secure and tamper-proof storage of academic credentials using blockchain technology.',
    supervisor: 'Dr. Fatima Ali',
    status: 'Completed',
    tags: ['Blockchain', 'Web3', 'Security'],
    progress: 100,
  },
  {
    id: 4,
    title: 'Natural Language Processing Chatbot',
    description: 'An intelligent chatbot for answering student queries using NLP and transformer models.',
    supervisor: 'Dr. Usman Tariq',
    status: 'In Progress',
    tags: ['NLP', 'AI', 'Python'],
    progress: 50,
  },
  {
    id: 5,
    title: 'Augmented Reality Navigation App',
    description: 'AR-powered indoor navigation app for guiding visitors within large university campuses.',
    supervisor: 'Prof. Nadia Hussain',
    status: 'Planning',
    tags: ['AR', 'Mobile', 'Unity'],
    progress: 10,
  },
  {
    id: 6,
    title: 'E-Learning Recommendation Engine',
    description: 'Personalized course recommendation system using collaborative filtering and AI.',
    supervisor: 'Dr. Kamran Malik',
    status: 'Completed',
    tags: ['ML', 'Education', 'Web'],
    progress: 100,
  },
];

const statusColors = {
  'In Progress': 'status-progress',
  Planning: 'status-planning',
  Completed: 'status-completed',
};

export default function Projects() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const statuses = ['All', 'In Progress', 'Planning', 'Completed'];

  const filtered = sampleProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="projects-page">
      <div className="projects-container">
        <div className="projects-header">
          <div>
            <h1>FYP Projects</h1>
            <p>Browse all final year projects in the portal.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="projects-filters">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search projects, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-tabs">
            {statuses.map((s) => (
              <button
                key={s}
                className={`filter-tab ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="no-results">No projects match your search.</div>
        ) : (
          <div className="projects-grid">
            {filtered.map((p) => (
              <div key={p.id} className="project-card">
                <div className="project-card-header">
                  <h3>{p.title}</h3>
                  <span className={`status-badge ${statusColors[p.status]}`}>{p.status}</span>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="project-footer">
                  <span className="supervisor-label">👤 {p.supervisor}</span>
                  <div className="progress-wrapper">
                    <div className="mini-progress-bar">
                      <div className="mini-progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="progress-pct">{p.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
