import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { SearchIcon } from '../../../common/Icon/_exports'
import { translations } from '../../../../i18n'
import './ChannelSearch.scss'

function ChannelSearch({ className = '', onChange = () => {} }) {
  const { formatMessage } = useIntl()

  return (
    <div className={`c-channel-search ${className}`}>
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

ChannelSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
}

export default ChannelSearch
