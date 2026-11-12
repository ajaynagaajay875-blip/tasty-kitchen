import Cookies from 'js-cookie'
import {NavLink, useNavigate} from 'react-router-dom'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
            alt="website logo"
            className="brand-logo"
          />
          <h1 className="brand-title">Tasty Kitchens</h1>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/surplus"
            className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Surplus Food
          </NavLink>
          <NavLink
            to="/donate"
            className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Donate Food
          </NavLink>
          <NavLink
            to="/cart"
            className={({isActive}) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Cart
          </NavLink>
          <button type="button" onClick={logout} className="logout-button">
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
