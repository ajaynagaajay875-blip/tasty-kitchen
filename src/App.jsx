import {Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import SurplusFood from './components/SurplusFood'
import DonateFood from './components/DonateFood'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/surplus"
        element={
          <ProtectedRoute>
            <SurplusFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donate"
        element={
          <ProtectedRoute>
            <DonateFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
