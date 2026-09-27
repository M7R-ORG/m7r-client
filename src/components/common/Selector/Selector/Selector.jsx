import PropTypes from 'prop-types'
import './Selector.scss'

function Selector({ className, items, setSelectedValue, selectedValue }) {
  const changeValueHandler = (event) => {
    setSelectedValue(event.target.value)
  }

  return (
    <div className={`c-selector ${className}`}>
      <select name="select" value={selectedValue} onChange={changeValueHandler}>
        {items.map((item) => (
          <option key={item.key} value={item.value}>
            {item.label ?? item.value}
          </option>
        ))}
      </select>
    </div>
  )
}

Selector.propTypes = {
  className: PropTypes.string,
  selectedValue: PropTypes.string,
  setSelectedValue: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
}

export default Selector
