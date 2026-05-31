import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from '../../common/Icon/_exports'
import './SearchInput.scss'

function SearchInput({
  value = '',
  placeholder = 'Search',
  ariaLabel = 'Search',
  autoFocus = false,
  onChange = () => {},
  onClear = () => {},
  onKeyDown = () => {}
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div className="c-search-input">
      <SearchIcon className="input-icon" />
      <input
        ref={inputRef}
        type="text"
        className="input-field"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {value && (
        <button
          type="button"
          className="input-clear"
          onClick={onClear}
          aria-label="Clear"
        >
          ×
        </button>
      )}
    </div>
  )
}

SearchInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onKeyDown: PropTypes.func
}

export default SearchInput
