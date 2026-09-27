import PropTypes from 'prop-types'
import './SettingsSection.scss'

function SettingsSection({ className = '', title = '', description = '', children = null }) {
  return (
    <section className={`c-settings-section ${className}`}>
      <div className="settings-section-header">
        <h2 className="settings-section-title">{title}</h2>
        {description && <p className="settings-section-description">{description}</p>}
      </div>

      <div className="settings-section-content">{children}</div>
    </section>
  )
}

SettingsSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default SettingsSection
