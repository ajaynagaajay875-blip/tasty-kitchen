import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/NotFound_kpncbm.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found. Please go back to the homepage.
    </p>
    <Link to="/" className="home-link">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
