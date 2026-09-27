import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import SearchIcon from './SearchIcon/SearchIcon'
import { translations } from '../../../../i18n'
import './SearchInput.scss'

function SearchInput({ className = '', onChange = () => {} }) {
  const { formatMessage } = useIntl()

  return (
    <div className={`c-search-input ${className}`}>
      <div className="search-icon-container">
        <SearchIcon className="search-icon" />
      </div>

      <div className="search-input-container">
        <input
          type="text"
          placeholder={formatMessage(translations.common.search)}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
}

export default SearchInput
