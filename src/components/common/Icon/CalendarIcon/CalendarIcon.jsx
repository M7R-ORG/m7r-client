import PropTypes from 'prop-types'
import './CalendarIcon.scss'

function CalendarIcon({ className = '' }) {
  return (
    <div className={`c-calendar-icon ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 10H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 3V6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3V6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

CalendarIcon.propTypes = {
  className: PropTypes.string
}

export default CalendarIcon
