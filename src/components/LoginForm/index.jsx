import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate, Navigate} from 'react-router-dom'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const submitForm = async event => {
    event.preventDefault()
    console.log('[Tasty Kitchens] Submitting login form with username:', username)

    if (!username || !password) {
      setErrorMsg('Username and password are required')
      console.warn('[Tasty Kitchens] Login validation failed: missing username or password')
      return
    }

    setIsLoading(true)
    setErrorMsg('')

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
      })

      const data = await response.json()
      console.log('[Tasty Kitchens] Login API response:', {status: response.status, ok: response.ok, data})

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        console.log('[Tasty Kitchens] JWT Token stored successfully, navigating to Home')
        navigate('/', {replace: true})
      } else {
        const message = data.error_msg || 'Invalid username or password'
        setErrorMsg(message)
        console.error('[Tasty Kitchens] Login failed:', message)
      }
    } catch (err) {
      console.error('[Tasty Kitchens] Login network error:', err)
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo-container">
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
            alt="website logo"
            className="login-logo"
          />
          <h1 className="login-brand-title">Tasty Kitchens</h1>
        </div>

        <h2 className="login-title">Login</h2>

        <form onSubmit={submitForm}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username (e.g. rahul)"
          />

          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (e.g. rahul@2021)"
          />

          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={e => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>

          <button type="submit" disabled={isLoading} className="login-submit-btn">
            {isLoading ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                aria-label="oval-loading"
                style={{display: 'inline-block', verticalAlign: 'middle'}}
              >
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="3">
                    <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            ) : (
              'Login'
            )}
          </button>

          {errorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>

      <div className="login-image-section">
        <img
          src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625809830/login-image_duk4fw.png"
          alt="website login"
          className="login-image"
        />
      </div>
    </div>
  )
}

export default LoginForm
