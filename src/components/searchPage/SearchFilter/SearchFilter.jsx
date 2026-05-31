import PropTypes from 'prop-types'
import './SearchFilter.scss'

function SearchFilter({ value, options = [], onChange = () => {} }) {
  return (
    <div className="c-search-filter" role="tablist">
      {options.map((option) => {
        const isActive = value === option.value
        const activeClass = isActive ? 'active' : ''
        
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`filter-tab ${activeClass}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

SearchFilter.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func
}

export default SearchFilter
