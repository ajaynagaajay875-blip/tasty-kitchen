import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-title">Tasty Kitchens</h1>
    </div>
    <p className="footer-tagline">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        aria-label="Pinterest"
        className="social-icon"
      />
      <FaInstagram
        testid="instagram-social-icon"
        aria-label="Instagram"
        className="social-icon"
      />
      <FaTwitter
        testid="twitter-social-icon"
        aria-label="Twitter"
        className="social-icon"
      />
      <FaFacebookSquare
        testid="facebook-social-icon"
        aria-label="Facebook"
        className="social-icon"
      />
    </div>
  </footer>
)

export default Footer
