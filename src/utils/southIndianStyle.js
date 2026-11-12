const southIndianRestaurantsList = [
  {
    name: 'Hotel Saravanaa Bhavan',
    cuisine: 'Pure Veg South Indian & Filter Coffee',
    location: 'Chennai',
  },
  {
    name: 'MTR - Mavalli Tiffin Room',
    cuisine: 'Heritage South Indian & Tiffins',
    location: 'Bangalore',
  },
  {
    name: 'Vidyarthi Bhavan',
    cuisine: 'Crispy Benne Dosa & Filter Kaapi',
    location: 'Bangalore',
  },
  {
    name: 'Dindigul Thalappakatti',
    cuisine: 'Authentic Seeraga Samba Biryani',
    location: 'Dindigul',
  },
  {
    name: 'Anjappar Chettinad Restaurant',
    cuisine: 'Traditional Chettinad & Spices',
    location: 'Karaikudi',
  },
  {
    name: 'Udupi Sri Krishna Vilas',
    cuisine: 'Coastal Karnataka & Pure Veg Meals',
    location: 'Udupi',
  },
  {
    name: 'Malabar Coast Kitchen',
    cuisine: 'Kerala Parotta & Malabar Curries',
    location: 'Kozhikode',
  },
  {
    name: 'Murugan Idli Shop',
    cuisine: 'Soft Ghee Podi Idli & Chutneys',
    location: 'Madurai',
  },
  {
    name: 'Sree Annapoorna',
    cuisine: 'Kongu Style South Indian & Coffee',
    location: 'Coimbatore',
  },
  {
    name: 'Rayalaseema Ruchulu',
    cuisine: 'Spicy South Indian & Rayalaseema',
    location: 'Tirupati',
  },
  {
    name: 'Mysore Cafe Traditional Tiffins',
    cuisine: 'Mysore Masala Dosa & Sweets',
    location: 'Mysore',
  },
  {
    name: 'Paragon Restaurant',
    cuisine: 'Malabar Biryani & Coastal Seafood',
    location: 'Calicut',
  },
  {
    name: 'A2B - Adyar Ananda Bhavan',
    cuisine: 'South Indian Veg Meals & Sweets',
    location: 'Chennai',
  },
  {
    name: 'Kritunga South Spices',
    cuisine: 'Spicy South Indian & Natu Kodi Pulao',
    location: 'Hyderabad',
  },
  {
    name: 'Brahmin\'s Coffee Bar',
    cuisine: 'Classic Idli Vada & Coconut Chutney',
    location: 'Bangalore',
  },
  {
    name: 'Madurai Muniyandi Vilas',
    cuisine: 'Kari Dosa & South Indian Meals',
    location: 'Madurai',
  },
  {
    name: 'Karavalli Coastal Dining',
    cuisine: 'Mangalorean & Coastal South India',
    location: 'Mangalore',
  },
  {
    name: 'Ponnusamy Non-Veg Hotel',
    cuisine: 'South Indian Military Meals & Biryani',
    location: 'Chennai',
  },
  {
    name: 'Ulavacharu Telugu Vantillu',
    cuisine: 'South Indian Traditional & Pulao',
    location: 'Vijayawada',
  },
  {
    name: 'Giri Manja\'s Seafood Kitchen',
    cuisine: 'Mangalore Anjal Fry & Fish Curry',
    location: 'Mangalore',
  },
  {
    name: 'Thalassery Biryani Centre',
    cuisine: 'Authentic Malabar Kaima Biryani',
    location: 'Kannur',
  },
  {
    name: 'Namma Veedu Vasantha Bhavan',
    cuisine: 'South Indian Vegetarian Delicacies',
    location: 'Trichy',
  },
  {
    name: 'Kuttanad Backwater Delights',
    cuisine: 'Traditional Kerala Duck & Fish Curry',
    location: 'Alappuzha',
  },
  {
    name: 'Woodlands South Indian Hotel',
    cuisine: 'Classic South Indian Thali & Tiffins',
    location: 'Chennai',
  },
  {
    name: 'Kovai Alankar Vilas',
    cuisine: 'Kongunadu Spicy Chicken & Meals',
    location: 'Coimbatore',
  },
  {
    name: 'Dakshin Heritage Kitchen',
    cuisine: 'Grand South Indian Royal Flavours',
    location: 'Hyderabad',
  },
  {
    name: 'Kayees Rahmathulla Hotel',
    cuisine: 'Kerala Dum Biryani & Roast',
    location: 'Kochi',
  },
  {
    name: 'Bhimavaram Bhojanam',
    cuisine: 'South Coastal Seafood & Biryani',
    location: 'Bhimavaram',
  },
  {
    name: 'Kadal Coastal Seafood',
    cuisine: 'Fresh Catch South Coastal Seafood',
    location: 'Kanyakumari',
  },
  {
    name: 'Guntur Gongura Mess',
    cuisine: 'Spicy South Indian Curries & Thali',
    location: 'Guntur',
  },
]

export const getSouthIndianRestaurantInfo = (id, fallbackName, fallbackCuisine, fallbackLocation) => {
  if (!id) {
    return {
      name: fallbackName || 'Hotel Saravanaa Bhavan',
      cuisine: fallbackCuisine || 'South Indian Traditional & Filter Coffee',
      location: fallbackLocation || 'Chennai',
    }
  }

  const strId = String(id)
  let hash = 0
  for (let i = 0; i < strId.length; i += 1) {
    hash = (hash * 31 + strId.charCodeAt(i)) % southIndianRestaurantsList.length
  }

  const item = southIndianRestaurantsList[Math.abs(hash)]
  return {
    name: item.name,
    cuisine: item.cuisine,
    location: item.location,
  }
}
