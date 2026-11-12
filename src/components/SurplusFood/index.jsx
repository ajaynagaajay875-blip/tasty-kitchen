import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import initialSurplusFood from '../../data/surplusFoodData'
import './index.css'

const SurplusFood = () => {
  const [foodList, setFoodList] = useState([])
  const [mealsSaved, setMealsSaved] = useState(120)
  const [searchText, setSearchText] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [bookingMessage, setBookingMessage] = useState('')

  useEffect(() => {
    const savedFood = localStorage.getItem('surplusFoodList')
    if (savedFood) {
      setFoodList(JSON.parse(savedFood))
    } else {
      setFoodList(initialSurplusFood)
      localStorage.setItem('surplusFoodList', JSON.stringify(initialSurplusFood))
    }

    const savedCount = localStorage.getItem('mealsSavedCount')
    if (savedCount) {
      setMealsSaved(Number(savedCount))
    }
  }, [])

  const handleClaimFood = foodItem => {
    if (foodItem.quantity <= 0) return

    const updatedList = foodList.map(item => {
      if (item.id === foodItem.id) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })

    const newMealsCount = mealsSaved + 1
    setFoodList(updatedList)
    setMealsSaved(newMealsCount)

    localStorage.setItem('surplusFoodList', JSON.stringify(updatedList))
    localStorage.setItem('mealsSavedCount', String(newMealsCount))

    const pickupCode = `SAVE-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingMessage(
      `Booked "${foodItem.dishName}" from ${foodItem.restaurantName}! Show Pickup Code: ${pickupCode} before ${foodItem.pickupBefore}.`,
    )
  }

  const filteredFood = foodList.filter(item => {
    const matchesSearch =
      item.dishName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.restaurantName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.location.toLowerCase().includes(searchText.toLowerCase())

    if (!matchesSearch) return false
    if (activeFilter === 'FREE') return item.isFreeForNgo
    if (activeFilter === 'VEG') return item.foodType === 'Veg'
    return true
  })

  const availableBatches = foodList.filter(item => item.quantity > 0).length
  const freeNgoBatches = foodList.filter(
    item => item.isFreeForNgo && item.quantity > 0,
  ).length

  return (
    <div className="app-page">
      <Header />
      <main className="surplus-container">
        <div className="surplus-top-header">
          <div>
            <h1 className="surplus-heading">Save Leftover Food</h1>
            <p className="surplus-subtext">
              Order fresh extra food from local restaurants at low prices, or claim
              free food batches for NGOs and needy people.
            </p>
          </div>
          <Link to="/donate" className="donate-link-btn">
            + Post Extra Food
          </Link>
        </div>

        {/* Simple Impact Summary */}
        <div className="summary-cards-row">
          <div className="summary-card">
            <h2 className="summary-number">{mealsSaved}</h2>
            <p className="summary-label">Total Meals Saved</p>
          </div>
          <div className="summary-card">
            <h2 className="summary-number">{availableBatches}</h2>
            <p className="summary-label">Available Food Items</p>
          </div>
          <div className="summary-card">
            <h2 className="summary-number">{freeNgoBatches}</h2>
            <p className="summary-label">Free for NGOs / Charity</p>
          </div>
        </div>

        {/* Booking Confirmation Banner */}
        {bookingMessage && (
          <div className="booking-alert">
            <span>{bookingMessage}</span>
            <button
              type="button"
              className="close-alert-btn"
              onClick={() => setBookingMessage('')}
            >
              X
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="surplus-controls">
          <input
            type="text"
            className="surplus-search"
            placeholder="Search dish, restaurant, or city..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />

          <div className="filter-buttons">
            <button
              type="button"
              className={activeFilter === 'ALL' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('ALL')}
            >
              All Food
            </button>
            <button
              type="button"
              className={activeFilter === 'FREE' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('FREE')}
            >
              Free for NGOs
            </button>
            <button
              type="button"
              className={activeFilter === 'VEG' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter('VEG')}
            >
              Veg Only
            </button>
          </div>
        </div>

        {/* Food Cards List */}
        {filteredFood.length === 0 ? (
          <div className="empty-surplus-box">
            <p>No surplus food found matching your search.</p>
          </div>
        ) : (
          <div className="surplus-grid">
            {filteredFood.map(item => (
              <div key={item.id} className="surplus-card">
                <img
                  src={item.imageUrl}
                  alt={item.dishName}
                  className="surplus-card-img"
                  onError={e => {
                    e.target.src =
                      'https://assets.ccbp.in/frontend/react-js/food-item-img.png'
                  }}
                />
                <div className="surplus-card-body">
                  <div className="card-tags">
                    <span
                      className={
                        item.foodType === 'Veg' ? 'tag veg-tag' : 'tag nonveg-tag'
                      }
                    >
                      {item.foodType}
                    </span>
                    {item.isFreeForNgo && (
                      <span className="tag ngo-tag">Free for NGO</span>
                    )}
                  </div>

                  <h3 className="dish-title">{item.dishName}</h3>
                  <p className="rest-name">{item.restaurantName}</p>
                  <p className="rest-location">{item.location}</p>
                  <p className="pickup-time">Pickup before: {item.pickupBefore}</p>

                  <div className="card-bottom">
                    <div className="price-info">
                      {item.price === 0 ? (
                        <span className="free-text">FREE</span>
                      ) : (
                        <>
                          <span className="discount-price">₹{item.price}</span>
                          <span className="old-price">₹{item.originalPrice}</span>
                        </>
                      )}
                      <span className="qty-left">
                        ({item.quantity} left)
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={item.quantity === 0}
                      className="claim-btn"
                      onClick={() => handleClaimFood(item)}
                    >
                      {item.quantity === 0 ? 'Sold Out' : 'Claim Food'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default SurplusFood
