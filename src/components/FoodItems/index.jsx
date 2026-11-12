import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import './index.css'

const FoodItems = ({food, quantity, increment, decrement}) => {
  const {id, name, cost, imageUrl, rating} = food

  return (
    <li testid="foodItem" className="food-item-card">
      <img
        src={imageUrl}
        alt={name}
        className="food-item-img"
        onError={e => {
          e.target.src = 'https://assets.ccbp.in/frontend/react-js/food-item-img.png'
        }}
      />
      <div className="food-item-info">
        <h3 className="food-item-name">{name}</h3>
        <p className="food-item-cost">
          <FaRupeeSign className="food-rupee-icon" /> {cost}
        </p>
        <div className="food-item-rating">
          {rating ? (
            <>
              <FaStar className="food-star-icon" /> {rating}
            </>
          ) : (
            ''
          )}
        </div>

        {quantity === 0 ? (
          <button
            type="button"
            className="food-add-btn"
            onClick={() => increment(food)}
          >
            ADD
          </button>
        ) : (
          <div className="food-quantity-control">
            <button
              type="button"
              testid="decrement-count"
              aria-label={`decrease ${name}`}
              onClick={() => decrement(food)}
              className="food-qty-btn"
            >
              <HiOutlineMinusSm />
            </button>
            <span testid="active-count" className="food-active-count">
              {quantity}
            </span>
            <button
              type="button"
              testid="increment-count"
              aria-label={`increase ${name}`}
              onClick={() => increment(food)}
              className="food-qty-btn"
            >
              <BsPlus />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItems
