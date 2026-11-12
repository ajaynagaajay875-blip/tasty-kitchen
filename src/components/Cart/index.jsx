import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus, BsCheckCircleFill} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'
import './index.css'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cartData')) || []
    console.log('[Tasty Kitchens] Loaded cart data from localStorage:', data)
    setCartItems(data)
  }, [])

  const saveCart = items => {
    console.log('[Tasty Kitchens] Saving updated cart to localStorage:', items)
    setCartItems(items)
    localStorage.setItem('cartData', JSON.stringify(items))
  }

  const updateQuantity = (id, change) => {
    console.log('[Tasty Kitchens] Updating cart item quantity:', {id, change})
    const updated = cartItems
      .map(item =>
        item.id === id
          ? {...item, quantity: Math.max(item.quantity + change, 0)}
          : item,
      )
      .filter(item => item.quantity > 0)

    saveCart(updated)
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.cost) * item.quantity,
    0,
  )

  const placeOrder = () => {
    if (cartItems.length > 0) {
      console.log('[Tasty Kitchens] Placing order for total:', totalPrice, cartItems)
      setShowSuccess(true)
      localStorage.removeItem('cartData')
      setCartItems([])
    }
  }

  const renderPaymentSuccessView = () => (
    <div className="payment-success-container">
      <BsCheckCircleFill className="success-icon" />
      <h1 className="success-heading">Payment Successful</h1>
      <p className="success-text">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/" className="home-link">
        <button type="button" className="go-home-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  const renderCartItemsView = () => (
    <section className="cart-content-container">
      <div className="cart-table-header">
        <p className="header-col item-header">Item</p>
        <p className="header-col quantity-header">Quantity</p>
        <p className="header-col price-header">Price</p>
      </div>

      <ul className="cart-list">
        {cartItems.map(item => (
          <li key={item.id} testid="cartItem" className="cart-item">
            <div className="cart-item-title-container">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
                onError={e => {
                  e.target.src = 'https://assets.ccbp.in/frontend/react-js/food-item-img.png'
                }}
              />
              <h2 className="cart-item-name">{item.name}</h2>
            </div>

            <div className="cart-quantity-control">
              <button
                type="button"
                testid="decrement-quantity"
                aria-label="decrease quantity"
                onClick={() => updateQuantity(item.id, -1)}
                className="cart-qty-btn"
              >
                <HiOutlineMinusSm />
              </button>
              <span testid="item-quantity" className="cart-qty-count">
                {item.quantity}
              </span>
              <button
                type="button"
                testid="increment-quantity"
                aria-label="increase quantity"
                onClick={() => updateQuantity(item.id, 1)}
                className="cart-qty-btn"
              >
                <BsPlus />
              </button>
            </div>

            <p className="cart-item-price">
              <FaRupeeSign /> {Number(item.cost) * item.quantity}
            </p>
          </li>
        ))}
      </ul>

      <hr className="cart-divider" />

      <div className="cart-summary-section">
        <div className="order-total-container">
          <h2 className="order-total-label">Order Total:</h2>
          <p className="order-total-value">
            <FaRupeeSign /> <span testid="total-price">{totalPrice}</span>
          </p>
        </div>
        <button type="button" className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </section>
  )

  return (
    <div className="app-page">
      <Header />
      <main className="cart-main">
        {showSuccess
          ? renderPaymentSuccessView()
          : cartItems.length === 0
          ? <CartEmpty />
          : renderCartItemsView()}
      </main>
      <Footer />
    </div>
  )
}

export default Cart
