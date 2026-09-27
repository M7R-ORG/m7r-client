import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { chatBackground } from '../../../constants/system'
import { setChatBackground } from '../../../redux/slices/systemSlice'
import { translations } from '../../../i18n'
import { CheckIcon } from '../../common/Icon/_exports'
import ChatBackground from '../../common/ChatBackground/ChatBackground'
import ChatPreview from '../ChatPreview/ChatPreview'
import './ChatBackgroundPicker.scss'

function ChatBackgroundPicker({ className = '' }) {
  const selectedBackground = useSelector((state) => state.system.chatBackground)
  const dispatch = useDispatch()
  const { formatMessage } = useIntl()

  return (
    <div className={`c-chat-background-picker ${className}`}>
      {Object.values(chatBackground).map((background) => {
        const isActive = background === selectedBackground

        return (
          <button
            key={background}
            type="button"
            className={`background-option ${isActive ? 'active' : ''}`}
            aria-pressed={isActive}
            onClick={() => dispatch(setChatBackground(background))}
          >
            <ChatBackground className="background-tile" background={background}>
              <ChatPreview isCompact />
              {isActive && <CheckIcon className="background-check" />}
            </ChatBackground>
            <span className="background-name">
              {formatMessage(translations.settings.backgrounds[background])}
            </span>
          </button>
        )
      })}
    </div>
  )
}

ChatBackgroundPicker.propTypes = {
  className: PropTypes.string
}

export default ChatBackgroundPicker
