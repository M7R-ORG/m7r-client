import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { channelType } from '../../../../../constants/chat'
import { translations } from '../../../../../i18n'
import './ChannelTypeSwitcher.scss'

function ChannelTypeSwitcher({ className = '', chatType, setChatType }) {
  const { formatMessage } = useIntl()

  const onClickHandler = () => {
    setChatType((prevType) =>
      prevType === channelType.public ? channelType.private : channelType.public
    )
  }

  return (
    <div
      className={`c-channel-type-switcher ${className}`}
      onClick={onClickHandler}
      role="presentation"
    >
      {chatType === channelType.public ? (
        <p>{formatMessage(translations.chat.channelType.public)}</p>
      ) : (
        <p>{formatMessage(translations.chat.channelType.private)}</p>
      )}
    </div>
  )
}

ChannelTypeSwitcher.propTypes = {
  className: PropTypes.string,
  chatType: PropTypes.string,
  setChatType: PropTypes.func
}

export default ChannelTypeSwitcher
