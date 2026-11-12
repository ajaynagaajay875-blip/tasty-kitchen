import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantsHeader = ({sortBy, sortByOptions, changeSort}) => (
  <div className="restaurants-header">
    <div className="heading-container">
      <h1 className="popular-heading">Popular Restaurants</h1>
      <p className="popular-desc">
        Select Your favourite restaurant and order the delicious food.
      </p>
    </div>

    <div className="sort-container">
      <BsFilterLeft className="filter-icon" />
      <span className="sort-label">Sort by</span>
      <select
        value={sortBy}
        onChange={changeSort}
        className="sort-select"
      >
        {sortByOptions.map(eachOption => (
          <option value={eachOption.value} key={eachOption.id}>
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  </div>
)

export default RestaurantsHeader
