import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'
import RestaurantsHeader from '../RestaurantsHeader'
import SomethingWentWrong from '../SomethingWentWrong'
import Loader from '../Loader'
import {getSouthIndianRestaurantInfo} from '../../utils/southIndianStyle'
import './index.css'

const LIMIT = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const AllRestaurants = () => {
  const [restaurantsList, setRestaurantsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [activePage, setActivePage] = useState(1)
  const [sortBy, setSortBy] = useState(sortByOptions[0].value)
  const [totalPages, setTotalPages] = useState(1)

  const getRestaurants = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const offset = (activePage - 1) * LIMIT
    console.log('[Tasty Kitchens] Fetching restaurants:', {offset, limit: LIMIT, sortBy, page: activePage})

    try {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortBy}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(url, options)
      const data = await response.json()
      console.log('[Tasty Kitchens] Restaurants API Response:', data)

      if (response.ok) {
        const formattedData = (data.restaurants || []).map(eachRestaurant => {
          const southIndianInfo = getSouthIndianRestaurantInfo(
            eachRestaurant.id,
            eachRestaurant.name,
            eachRestaurant.cuisine,
          )

          return {
            id: eachRestaurant.id,
            name: southIndianInfo.name,
            cuisine: southIndianInfo.cuisine,
            imageUrl: eachRestaurant.image_url,
            userRating: {
              rating: eachRestaurant.user_rating?.rating,
              ratingColor: eachRestaurant.user_rating?.rating_color,
              totalReviews: eachRestaurant.user_rating?.total_reviews,
            },
            costForTwo: eachRestaurant.cost_for_two,
          }
        })

        setRestaurantsList(formattedData)
        const total = data.total || data.total_restaurants || data.total_count || 30
        setTotalPages(Math.ceil(total / LIMIT))
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (err) {
      console.error('[Tasty Kitchens] Error fetching restaurants:', err)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getRestaurants()
  }, [activePage, sortBy])

  const changeSort = event => {
    setSortBy(event.target.value)
    setActivePage(1)
  }

  const onClickPrevious = () => {
    if (activePage > 1) {
      setActivePage(prev => prev - 1)
    }
  }

  const onClickNext = () => {
    if (activePage < totalPages) {
      setActivePage(prev => prev + 1)
    }
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader testId="restaurants-list-loader" />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrong retry={getRestaurants} />
  )

  const renderRestaurantsListView = () => (
    <>
      <ul className="restaurants-list">
        {restaurantsList.map(restaurant => (
          <li
            key={restaurant.id}
            testid="restaurant-item"
            className="restaurant-item-card"
          >
            <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card-link">
              <img
                src={restaurant.imageUrl}
                alt="restaurant"
                className="restaurant-image"
                onError={e => {
                  e.target.src = 'https://assets.ccbp.in/frontend/react-js/food-item-img.png'
                }}
              />
              <div className="restaurant-details">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                <div className="restaurant-rating-container">
                  <FaStar className="star-icon" />
                  <span className="rating-number">{restaurant.userRating.rating}</span>
                  <span className="rating-reviews">
                    ({restaurant.userRating.totalReviews} ratings)
                  </span>
                </div>
                <p className="restaurant-cost">₹{restaurant.costForTwo} for two</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        <button
          type="button"
          testid="pagination-left-button"
          className="pagination-btn"
          onClick={onClickPrevious}
          disabled={activePage === 1}
          aria-label="Previous Page"
        >
          <AiOutlineLeftSquare className="pagination-icon" />
        </button>
        <span testid="active-page-number" className="page-number-display">
          {activePage} of {totalPages}
        </span>
        <button
          type="button"
          testid="pagination-right-button"
          className="pagination-btn"
          onClick={onClickNext}
          disabled={activePage === totalPages}
          aria-label="Next Page"
        >
          <AiOutlineRightSquare className="pagination-icon" />
        </button>
      </div>
    </>
  )

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderRestaurantsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="all-restaurants-section">
      <RestaurantsHeader
        sortBy={sortBy}
        sortByOptions={sortByOptions}
        changeSort={changeSort}
      />
      {renderContent()}
    </div>
  )
}

export default AllRestaurants
