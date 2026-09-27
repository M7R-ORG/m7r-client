import PropTypes from 'prop-types'
import './SegmentedControl.scss'

function SegmentedControl({ className = '', options = [], value = '', onChange = () => {} }) {
  return (
    <div className={`c-segmented-control ${className}`}>
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            className={`segmented-option ${isActive ? 'active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.icon}
            <span className="segmented-option-label">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

SegmentedControl.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.element
    })
  )
}

export default SegmentedControl
