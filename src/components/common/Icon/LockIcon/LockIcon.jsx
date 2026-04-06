import PropTypes from 'prop-types'
import './LockIcon.scss'

function LockIcon({ className = '' }) {
  return (
    <div className={`c-lock-icon ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="11"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
      </svg>
    </div>
  )
}

LockIcon.propTypes = {
  className: PropTypes.string
}

export default LockIcon
