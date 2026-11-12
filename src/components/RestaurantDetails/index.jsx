import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaStar, FaLeaf} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import Loader from '../Loader'
import FoodItems from '../FoodItems'
import SomethingWentWrong from '../SomethingWentWrong'
import {getSouthIndianRestaurantInfo} from '../../utils/southIndianStyle'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RestaurantDetails = () => {
  const {id} = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [quantities, setQuantities] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartQuantities = {}
    cartData.forEach(item => {
      cartQuantities[item.id] = item.quantity
    })
    console.log('[Tasty Kitchens] Initializing restaurant details with existing cart:', cartQuantities)
    setQuantities(cartQuantities)
  }, [])

  const getRestaurantDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    console.log('[Tasty Kitchens] Fetching restaurant details for ID:', id)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(
        `https://apis.ccbp.in/restaurants-list/${id}`,
        options,
      )
      const data = await response.json()
      console.log('[Tasty Kitchens] Restaurant details response:', data)

      if (response.ok) {
        const southIndianInfo = getSouthIndianRestaurantInfo(
          data.id,
          data.name,
          data.cuisine,
          data.location,
        )

        const formattedData = {
          id: data.id,
          name: southIndianInfo.name,
          imageUrl: data.image_url,
          cuisine: southIndianInfo.cuisine,
          location: southIndianInfo.location,
          rating: data.rating,
          reviewsCount: data.reviews_count,
          costForTwo: data.cost_for_two,
          foodItems: (data.food_items || []).map(item => ({
            id: item.id,
            name: item.name,
            cost: item.cost,
            foodType: item.food_type,
            imageUrl: item.image_url,
            rating: item.rating,
          })),
        }
        setRestaurantData(formattedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (err) {
      console.error('[Tasty Kitchens] Error loading restaurant details:', err)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getRestaurantDetails()
  }, [id])

  const getQuantity = foodId => quantities[foodId] || 0

  const updateCart = (food, quantity) => {
    const oldCart = JSON.parse(localStorage.getItem('cartData')) || []
    const existingIndex = oldCart.findIndex(item => item.id === food.id)

    if (quantity <= 0) {
      const updated = oldCart.filter(item => item.id !== food.id)
      console.log('[Tasty Kitchens] Removed item from cart:', food.name)
      localStorage.setItem('cartData', JSON.stringify(updated))
      return
    }

    const cartItem = {
      cost: food.cost,
      quantity,
      id: food.id,
      imageUrl: food.imageUrl,
      name: food.name,
    }

    if (existingIndex === -1) {
      oldCart.push(cartItem)
      console.log('[Tasty Kitchens] Added item to cart:', cartItem)
    } else {
      oldCart[existingIndex] = cartItem
      console.log('[Tasty Kitchens] Updated item in cart:', cartItem)
    }

    localStorage.setItem('cartData', JSON.stringify(oldCart))
  }

  const increment = food => {
    const newQuantity = getQuantity(food.id) + 1
    setQuantities(prev => ({...prev, [food.id]: newQuantity}))
    updateCart(food, newQuantity)
  }

  const decrement = food => {
    const current = getQuantity(food.id)
    if (current > 0) {
      const newQuantity = current - 1
      setQuantities(prev => ({...prev, [food.id]: newQuantity}))
      updateCart(food, newQuantity)
    }
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader testId="restaurant-details-loader" />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrong retry={getRestaurantDetails} />
  )

  const renderRestaurantDetailsView = () => {
    if (!restaurantData) return null
    const {foodItems = []} = restaurantData

    return (
      <main className="details-main-container">
        <section className="restaurant-hero-banner">
          <img
            src={restaurantData.imageUrl}
            alt="restaurant"
            className="restaurant-hero-img"
            onError={e => {
              e.target.src = 'https://assets.ccbp.in/frontend/react-js/restaurant-banner.png'
            }}
          />
          <div className="hero-details">
            <h1 className="hero-name">{restaurantData.name}</h1>
            <p className="hero-cuisine">{restaurantData.cuisine}</p>
            <p className="hero-location">{restaurantData.location}</p>
            <div className="hero-meta-section">
              <div className="hero-meta-item">
                <p className="hero-meta-val">
                  <FaStar className="hero-star-icon" /> {restaurantData.rating}
                </p>
                <p className="hero-meta-sub">{restaurantData.reviewsCount}+ Ratings</p>
              </div>
              <div className="hero-meta-separator" />
              <div className="hero-meta-item">
                <p className="hero-meta-val">₹ {restaurantData.costForTwo}</p>
                <p className="hero-meta-sub">Cost for two</p>
              </div>
            </div>
          </div>
        </section>

        <div className="zero-waste-partner-banner">
          <div className="zw-badge">
            <FaLeaf style={{marginRight: '6px'}} /> Food Waste Saver Partner
          </div>
          <p className="zw-text">
            Looking for discounted extra food or free NGO meals from local kitchens?
          </p>
          <Link to="/surplus" className="zw-link">
            Check Surplus Food &rarr;
          </Link>
        </div>

        <section className="food-items-section">
          <ul className="food-items-grid">
            {foodItems.map(food => (
              <FoodItems
                key={food.id}
                food={food}
                quantity={getQuantity(food.id)}
                increment={increment}
                decrement={decrement}
              />
            ))}
          </ul>
        </section>
      </main>
    )
  }

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderRestaurantDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="app-page">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  )
}

export default RestaurantDetails
