import PropTypes from 'prop-types'
import './SidebarExpander.scss'

function SidebarExpander({ className = '' }) {
  return (
    <div className={`c-sidebar-expander ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

SidebarExpander.propTypes = {
  className: PropTypes.string
}

export default SidebarExpander
