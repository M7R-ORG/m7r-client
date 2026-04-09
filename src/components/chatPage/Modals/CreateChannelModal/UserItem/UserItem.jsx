import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { activityStatus, page } from '../../../../../constants/system'
import { RoundCheckbox } from '../../../../_exports'
import { ArrowIcon } from '../../../../common/Icon/_exports'
import api from '../../../../../api/api'
import { getActivityStatus } from '../../../ChatHeader/ChatHeader'
import Avatar from '../../../../common/Avatar/Avatar'
import './UserItem.scss'

function UserItem({
  className = '',
  userInfo = null,
  isChecked = false,
  onToggle = () => {},
  setIsActive = () => {}
}) {
  const navigate = useNavigate()
  const { id, login, activityStatus: status, isBanned, image } = userInfo
  const statusClass = status.toLowerCase() === activityStatus.online ? 'online' : ''
  const bannedClass = isBanned ? 'yes' : ''

  const onClickHandler = () => {
    onToggle(id)
  }

  const onClickDirectHandler = async (event) => {
    event.stopPropagation()

    const { data: chatId } = await api.channel.setUpDirectChannel({
      partnerId: id
    })

    if (chatId) {
      navigate(`${page.chat}/${chatId}`)
      setIsActive(false)
    }
  }

  const adaptedActivityStatus = getActivityStatus({
    status: userInfo.activityStatus,
    lastOnlineAt: userInfo.lastOnlineAt
  })

  return (
    <div
      className={`c-chat-user-item ${className} ${statusClass} ${bannedClass}`}
      onClick={onClickHandler}
      role="presentation"
    >
      <div className="select">
        <RoundCheckbox className="round-checkbox" checked={isChecked} />
      </div>

      <div className="image">
        <Avatar image={image} name={login} />
      </div>

      <div className="user-info">
        <div className="login">{login}</div>
        <div className="activity">{adaptedActivityStatus}</div>
      </div>

      <div className="direct" onClick={onClickDirectHandler} role="presentation">
        <ArrowIcon className="arrow-icon" />
      </div>
    </div>
  )
}

UserItem.propTypes = {
  className: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    activityStatus: PropTypes.string,
    lastOnlineAt: PropTypes.string,
    isBanned: PropTypes.bool
  }),
  isChecked: PropTypes.bool,
  onToggle: PropTypes.func,
  setIsActive: PropTypes.func
}

export default UserItem
