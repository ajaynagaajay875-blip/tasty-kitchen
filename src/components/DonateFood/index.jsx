import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import initialSurplusFood from '../../data/surplusFoodData'
import './index.css'

const DonateFood = () => {
  const navigate = useNavigate()

  const [dishName, setDishName] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [location, setLocation] = useState('')
  const [quantity, setQuantity] = useState(5)
  const [foodType, setFoodType] = useState('Veg')
  const [pickupBefore, setPickupBefore] = useState('9:30 PM Today')
  const [isFreeForNgo, setIsFreeForNgo] = useState(false)
  const [originalPrice, setOriginalPrice] = useState(200)
  const [price, setPrice] = useState(50)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    if (!dishName.trim() || !restaurantName.trim() || !location.trim()) {
      setErrorMsg('Please fill in dish name, restaurant name, and location.')
      return
    }

    const newFoodItem = {
      id: `sf-${Date.now()}`,
      dishName: dishName.trim(),
      restaurantName: restaurantName.trim(),
      location: location.trim(),
      originalPrice: Number(originalPrice) || 200,
      price: isFreeForNgo ? 0 : Number(price) || 0,
      quantity: Number(quantity) || 1,
      foodType,
      pickupBefore: pickupBefore.trim() || 'Today Evening',
      isFreeForNgo,
      imageUrl:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    }

    const savedData = localStorage.getItem('surplusFoodList')
    const currentList = savedData ? JSON.parse(savedData) : initialSurplusFood
    const updatedList = [newFoodItem, ...currentList]

    localStorage.setItem('surplusFoodList', JSON.stringify(updatedList))
    navigate('/surplus')
  }

  return (
    <div className="app-page">
      <Header />
      <main className="donate-container">
        <div className="donate-card">
          <h1 className="donate-heading">Post Extra / Leftover Food</h1>
          <p className="donate-subtext">
            Have extra food at your restaurant or event? Post it here so people
            can buy it at a low price or NGOs can pick it up for free.
          </p>

          <form onSubmit={handleSubmit} className="donate-form">
            <div className="donate-field">
              <label htmlFor="dishName">Food / Dish Name *</label>
              <input
                id="dishName"
                type="text"
                placeholder="e.g. Veg Pulao & Raita Packets"
                value={dishName}
                onChange={e => setDishName(e.target.value)}
              />
            </div>

            <div className="donate-field">
              <label htmlFor="restaurantName">Restaurant / Kitchen Name *</label>
              <input
                id="restaurantName"
                type="text"
                placeholder="e.g. Annapurna Kitchen"
                value={restaurantName}
                onChange={e => setRestaurantName(e.target.value)}
              />
            </div>

            <div className="donate-field">
              <label htmlFor="location">Pickup Location / City *</label>
              <input
                id="location"
                type="text"
                placeholder="e.g. MG Road, Bangalore"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            <div className="donate-row">
              <div className="donate-field">
                <label htmlFor="quantity">Packets / Plates Available</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>

              <div className="donate-field">
                <label htmlFor="foodType">Food Type</label>
                <select
                  id="foodType"
                  value={foodType}
                  onChange={e => setFoodType(e.target.value)}
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>
            </div>

            <div className="donate-field">
              <label htmlFor="pickupBefore">Pickup Before Time</label>
              <input
                id="pickupBefore"
                type="text"
                placeholder="e.g. 9:30 PM Today"
                value={pickupBefore}
                onChange={e => setPickupBefore(e.target.value)}
              />
            </div>

            <div className="donate-checkbox-row">
              <input
                id="isFreeForNgo"
                type="checkbox"
                checked={isFreeForNgo}
                onChange={e => setIsFreeForNgo(e.target.checked)}
              />
              <label htmlFor="isFreeForNgo">
                Give this food for FREE to NGOs / Charity
              </label>
            </div>

            {!isFreeForNgo && (
              <div className="donate-row">
                <div className="donate-field">
                  <label htmlFor="originalPrice">Normal Price (₹)</label>
                  <input
                    id="originalPrice"
                    type="number"
                    min="1"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(e.target.value)}
                  />
                </div>

                <div className="donate-field">
                  <label htmlFor="price">Discounted Price (₹)</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>
            )}

            {errorMsg && <p className="error-message">{errorMsg}</p>}

            <button type="submit" className="donate-submit-btn">
              Post Food Now
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DonateFood
