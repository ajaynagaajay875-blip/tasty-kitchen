import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Loader from '../Loader'
import AllRestaurants from '../AllRestaurants'
import './index.css'

const Home = () => {
  const [offersList, setOffersList] = useState([])
  const [offersLoading, setOffersLoading] = useState(true)
  const [offersError, setOffersError] = useState(false)
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)

  const getOffers = async () => {
    setOffersLoading(true)
    setOffersError(false)
    try {
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', options)
      const data = await response.json()

      if (response.ok) {
        const formattedOffers = (data.offers || []).map(item => ({
          id: item.id,
          imageUrl: item.image_url,
        }))
        setOffersList(formattedOffers)
      } else {
        setOffersError(true)
      }
    } catch (err) {
      setOffersError(true)
    } finally {
      setOffersLoading(false)
    }
  }

  useEffect(() => {
    getOffers()
  }, [])

  useEffect(() => {
    if (offersList.length === 0) return
    const interval = setInterval(() => {
      setCurrentOfferIndex(prev => (prev + 1) % offersList.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [offersList])

  const renderOffersCarousel = () => {
    if (offersLoading) {
      return (
        <div className="loader-container" testid="restaurants-offers-loader">
          <Loader testId="restaurants-offers-loader" />
        </div>
      )
    }

    if (offersError || offersList.length === 0) {
      return null
    }

    return (
      <div className="offers-carousel-wrapper">
        <div
          className="offers-carousel-track"
          style={{transform: `translateX(-${currentOfferIndex * 100}%)`}}
        >
          {offersList.map(offer => (
            <div key={offer.id} className="offers-carousel-slide">
              <img
                src={offer.imageUrl}
                alt="offer"
                className="offer-banner-image"
              />
            </div>
          ))}
        </div>
        <div className="offers-carousel-dots">
          {offersList.map((offer, idx) => (
            <button
              key={offer.id}
              type="button"
              className={`carousel-dot ${idx === currentOfferIndex ? 'active' : ''}`}
              onClick={() => setCurrentOfferIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="app-page">
      <Header />
      <main className="home-main-content">
        {renderOffersCarousel()}

        <div className="surplus-callout-banner">
          <div>
            <h2 className="callout-title">Help Reduce Food Waste!</h2>
            <p className="callout-text">
              Restaurants post extra food at discounted prices or free for NGOs before closing time.
            </p>
          </div>
          <div className="callout-actions">
            <Link to="/surplus" className="callout-btn primary">
              View Surplus Food
            </Link>
            <Link to="/donate" className="callout-btn secondary">
              Donate Extra Food
            </Link>
          </div>
        </div>

        <AllRestaurants />
      </main>
      <Footer />
    </div>
  )
}

export default Home
