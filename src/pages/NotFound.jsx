import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-content">
        <span className="notfound-icon">🔍</span>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="home-link">← Back to Home</Link>
      </div>
    </div>
  );
}
