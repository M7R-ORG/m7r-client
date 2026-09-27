import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { EmptyChatsIcon } from '../../../common/Icon/_exports'
import { translations } from '../../../../i18n'
import './ChannelListEmpty.scss'

function ChannelListEmpty({ className = '', isSearching = false }) {
  const { formatMessage } = useIntl()

  return (
    <div className={`c-channel-list-empty ${className}`}>
      <div className="empty-illustration">
        <EmptyChatsIcon className="empty-icon" />
      </div>
      <p className="empty-title">
        {isSearching
          ? formatMessage(translations.chat.channelListEmpty.nothingFound)
          : formatMessage(translations.chat.channelListEmpty.noChats)}
      </p>
      <span className="empty-hint">
        {isSearching
          ? formatMessage(translations.chat.channelListEmpty.tryAnotherQuery)
          : formatMessage(translations.chat.channelListEmpty.createHint)}
      </span>
    </div>
  )
}

ChannelListEmpty.propTypes = {
  className: PropTypes.string,
  isSearching: PropTypes.bool
}

export default ChannelListEmpty
