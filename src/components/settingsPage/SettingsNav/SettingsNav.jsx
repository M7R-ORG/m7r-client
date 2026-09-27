import PropTypes from 'prop-types'
import './SettingsNav.scss'

function SettingsNav({ className = '', sections = [] }) {
  return (
    <nav className={`c-settings-nav ${className}`}>
      <div className="settings-nav-list">
        {sections.map(({ id, title }) => (
          <a key={id} className="settings-nav-item" href={`#${id}`}>
            {title}
          </a>
        ))}
      </div>
    </nav>
  )
}

SettingsNav.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string
    })
  )
}

export default SettingsNav
