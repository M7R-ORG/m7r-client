import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { Logo } from '../../_exports'
import { translations } from '../../../i18n'
import './NoChatSelected.scss'

function NoChatSelected({ className = '' }) {
  const { formatMessage } = useIntl()

  return (
    <div className={`c-no-chat-selected ${className}`}>
      <div className="empty-logo">
        <Logo className="logo" />
      </div>
      <h3 className="empty-title">{formatMessage(translations.chat.noChatSelected.title)}</h3>
      <p className="empty-subtitle">{formatMessage(translations.chat.noChatSelected.subtitle)}</p>
    </div>
  )
}

NoChatSelected.propTypes = {
  className: PropTypes.string
}

export default NoChatSelected
