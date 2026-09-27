import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { channelType } from '../../../constants/chat'
import { MenuIcon } from '../../common/Icon/_exports'
import { activityStatus } from '../../../constants/system'
import Avatar from '../../common/Avatar/Avatar'
import Loader2 from '../../common/Loader/Loader2/Loader2'
import MessageSearch from './MessageSearch/MessageSearch'
import formatLastOnlineAt from '../../../utils/helpers/formatHelper'
import { translations } from '../../../i18n'
import './ChatHeader.scss'

export const getActivityStatus = ({ status, lastOnlineAt, formatMessage }) => {
  const isOnline = status?.toLowerCase() === activityStatus.online

  const result = isOnline
    ? formatMessage(translations.common.onlineNow)
    : formatLastOnlineAt(lastOnlineAt)

  return result
}

function ChatHeader({ className = '', channel = null, isLoading, setSearchMessage }) {
  const { formatMessage } = useIntl()

  const adaptedChatInfo = getActivityStatus({
    status: channel?.userActivityStatus,
    lastOnlineAt: channel?.userLastOnlineAt,
    formatMessage
  })

  return (
    <div className={`c-chat-header ${className}`}>
      {isLoading ? (
        <Loader2 className="loader" />
      ) : (
        <>
          <div className="image">
            {channel && <Avatar imageId={channel.imageId} name={channel.name} isLazy />}
          </div>

          <div className="info">
            <div className="channel-name">{channel?.name}</div>

            <div className="additional-info">
              {channel?.type === channelType.direct ? (
                <div className="status-info">{adaptedChatInfo}</div>
              ) : (
                <div className="members-count">
                  {formatMessage(translations.chat.members, { count: channel?.membersCount ?? '' })}
                </div>
              )}
            </div>
          </div>

          <div className="search-wrapper">
            <MessageSearch className="search" setSearchMessage={setSearchMessage} />
          </div>

          <div className="menu">
            <MenuIcon className="menu-icon" />
          </div>
        </>
      )}
    </div>
  )
}

ChatHeader.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  setSearchMessage: PropTypes.func,
  channel: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    imageId: PropTypes.string,
    membersCount: PropTypes.number,
    userActivityStatus: PropTypes.string,
    userLastOnlineAt: PropTypes.string
  })
}

export default ChatHeader
