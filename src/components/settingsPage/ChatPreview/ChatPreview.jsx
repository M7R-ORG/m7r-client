import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { translations } from '../../../i18n'
import './ChatPreview.scss'

function ChatPreview({ className = '', isCompact = false }) {
  const { formatMessage } = useIntl()

  if (isCompact) {
    return (
      <div className={`c-chat-preview compact ${className}`}>
        <div className="preview-message" />
        <div className="preview-message my" />
      </div>
    )
  }

  return (
    <div className={`c-chat-preview ${className}`}>
      <div className="preview-date">{formatMessage(translations.common.today)}</div>
      <div className="preview-message">{formatMessage(translations.settings.preview.incoming)}</div>
      <div className="preview-message my">
        {formatMessage(translations.settings.preview.outgoing)}
      </div>
    </div>
  )
}

ChatPreview.propTypes = {
  className: PropTypes.string,
  isCompact: PropTypes.bool
}

export default ChatPreview
