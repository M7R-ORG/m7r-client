import PropTypes from 'prop-types'
import './SettingsField.scss'

function SettingsField({ className = '', label = '', hint = '', children = null }) {
  return (
    <div className={`c-settings-field ${className}`}>
      <div className="settings-field-label">
        <span>{label}</span>
        {hint && <span className="settings-field-hint">{hint}</span>}
      </div>

      <div className="settings-field-control">{children}</div>
    </div>
  )
}

SettingsField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default SettingsField
