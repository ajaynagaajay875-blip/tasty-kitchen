# Tasty Kitchens - Surplus Food Rescue App

A React.js web application built to help reduce restaurant food waste. Along with browsing restaurants and ordering food, users can buy extra/leftover food at low prices, NGOs can claim free bulk meals, and restaurants can post extra food before closing time.

## Live Demo
- **Deployed App:** [https://tasty-kitchens-umber.vercel.app](https://tasty-kitchens-umber.vercel.app/login)
- **Demo Login:** Username `rahul` | Password `rahul@2021`

## Problem It Solves
Many restaurants and caterers have leftover fresh food at the end of the day that often gets thrown away, while students and needy people look for affordable or free meals. This project connects kitchens with people and NGOs so extra food is saved instead of wasted.

## Features
- **Login & Protected Routes**: Login using JWT authentication (`js-cookie` and `react-router-dom`).
- **Browse Restaurants & Menu**: View restaurants, sort by rating, inspect food items, and add items to the cart.
- **Surplus Food Page (`/surplus`)**:
  - View extra/leftover food items posted by restaurants.
  - Search by dish, restaurant, or city, and filter by **All Food**, **Free for NGOs**, and **Veg Only**.
  - Click **Claim Food** to book a meal, get a pickup code, and update the **Total Meals Saved** counter.
- **Donate / Post Extra Food (`/donate`)**:
  - Simple form for restaurants or kitchens to add leftover food items (dish name, location, quantity, Veg/Non-Veg, pickup time, discounted price or free for NGOs).
  - Saves listings in `localStorage` so changes persist after refreshing.
- **Shopping Cart (`/cart`)**: Add, increment, decrement, and place orders with `localStorage` persistence.

## Tech Stack
- React.js (Functional Components, `useState`, `useEffect`)
- React Router DOM v6
- Vite
- CSS3 (Flexbox & Grid)
- LocalStorage & Cookies (`js-cookie`)

## Project Structure
```text
src/
├── components/
│   ├── AllRestaurants/
│   ├── Cart/
│   ├── DonateFood/        # Form to post extra/leftover food
│   ├── Footer/
│   ├── Header/            # Navigation bar
│   ├── Home/              # Offers carousel + surplus callout + restaurants
│   ├── LoginForm/
│   ├── ProtectedRoute/
│   ├── RestaurantDetails/
│   └── SurplusFood/       # Leftover food listing, filters, and claim logic
├── data/
│   └── surplusFoodData.js # Initial sample surplus food data
└── App.jsx                # Routes configuration
```

## How to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the URL shown in the terminal (usually `http://localhost:5173`) and log in with:
   - **Username:** `rahul`
   - **Password:** `rahul@2021`
