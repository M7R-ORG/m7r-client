import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { Logo } from '../../../_exports'
import { translations } from '../../../../i18n'
import './MessageListEmpty.scss'

function MessageListEmpty({ className = '', searchQuery = '' }) {
  const { formatMessage } = useIntl()

  return (
    <div className={`c-message-list-empty ${className}`}>
      <Logo className="logo" />
      <p>
        {searchQuery
          ? formatMessage(translations.chat.messageListEmpty.notFound, { query: searchQuery })
          : formatMessage(translations.chat.noMessages)}
      </p>
      {!searchQuery && <span>{formatMessage(translations.chat.messageListEmpty.startHint)}</span>}
    </div>
  )
}

MessageListEmpty.propTypes = {
  className: PropTypes.string,
  searchQuery: PropTypes.string
}

export default MessageListEmpty
