import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { SearchIcon } from '../../common/Icon/_exports'
import { translations } from '../../../i18n'
import './SearchInput.scss'

function SearchInput({
  value = '',
  placeholder,
  ariaLabel,
  autoFocus = false,
  onChange = () => {},
  onClear = () => {},
  onKeyDown = () => {}
}) {
  const { formatMessage } = useIntl()
  const inputRef = useRef(null)
  const defaultLabel = formatMessage(translations.common.search)

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
        placeholder={placeholder ?? defaultLabel}
        aria-label={ariaLabel ?? defaultLabel}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {value && (
        <button
          type="button"
          className="input-clear"
          onClick={onClear}
          aria-label={formatMessage(translations.common.clear)}
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
