import PropTypes from 'prop-types'
import './CheckIcon.scss'

function CheckIcon({ className = '' }) {
  return (
    <div className={`c-check-icon ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </div>
  )
}

CheckIcon.propTypes = {
  className: PropTypes.string
}

export default CheckIcon
