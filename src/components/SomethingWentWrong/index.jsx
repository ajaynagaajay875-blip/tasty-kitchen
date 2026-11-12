import './index.css'

const SomethingWentWrong = ({retry}) => (
  <div className="something-went-wrong-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-image"
    />
    <h1 className="failure-heading">Something Went Wrong</h1>
    <p className="failure-desc">
      We are having some trouble processing your request. Please try again.
    </p>
    {retry && (
      <button type="button" className="retry-btn" onClick={retry}>
        Retry
      </button>
    )}
  </div>
)

export default SomethingWentWrong
