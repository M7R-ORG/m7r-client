import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import ToolsIcon from '../../common/Icon/ToolsIcon/ToolsIcon'
import DropDown from '../../common/DropDown/DropDown'
import { activityStatus } from '../../../constants/system'
import api from '../../../api/api'
import { translations } from '../../../i18n'
import UnblockIcon from '../../common/Icon/UnblockIcon/UnblockIcon'
import BlockIcon from '../../common/Icon/BlockIcon/BlockIcon'
import Avatar from '../../common/Avatar/Avatar'
import { EditIcon } from '../../common/Icon/_exports'
import StatusBadge from './StatusBadge/StatusBadge'
import './UserItem.scss'

function UserItem({ className = '', userInfo = null, loadUsers = null, openUpdateModal = null }) {
  const { formatMessage } = useIntl()
  const { id, login, email, birthday, activityStatus: status, isBanned, imageId } = userInfo
  const isOnline = status.toLowerCase() === activityStatus.online
  const statusLabel = isOnline
    ? formatMessage(translations.common.online)
    : formatMessage(translations.admin.users.offline)
  const bannedClass = isBanned ? 'yes' : ''
  const dropDownItems = [
    {
      icon: <EditIcon className="dropdown-icon" />,
      title: formatMessage(translations.admin.edit),
      onClick: () => openUpdateModal(userInfo)
    },
    isBanned
      ? {
          icon: <UnblockIcon className="dropdown-icon" />,
          title: formatMessage(translations.admin.users.unblock),
          onClick: () => {
            api.user.unblockUser({ id }).then(() => loadUsers())
          }
        }
      : {
          icon: <BlockIcon className="dropdown-icon" />,
          title: formatMessage(translations.admin.users.block),
          onClick: () => {
            api.user.blockUser({ id }).then(() => loadUsers())
          }
        }
  ]

  return (
    <tr className={`c-user-item ${className}`}>
      <td className="image" aria-label={login}>
        <Avatar imageId={imageId} name={login} />
      </td>
      <td className="cell-id">{id}</td>
      <td className="email">{email}</td>
      <td className="login">{login}</td>
      <td className="birthday">{birthday}</td>
      <td className="activity-status" aria-label={statusLabel}>
        <StatusBadge status={statusLabel} isOnline={isOnline} />
      </td>
      <td className={`banned ${bannedClass}`}>
        <span className="banned-badge">
          {isBanned
            ? formatMessage(translations.admin.users.bannedStatus)
            : formatMessage(translations.admin.users.active)}
        </span>
      </td>
      <td className="tools">
        <DropDown items={dropDownItems} className="bottom">
          <ToolsIcon className="tools-icon" aria-label="tools" />
        </DropDown>
      </td>
    </tr>
  )
}

UserItem.propTypes = {
  className: PropTypes.string,
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    imageId: PropTypes.string,
    birthday: PropTypes.string,
    activityStatus: PropTypes.string,
    isBanned: PropTypes.bool
  }),
  loadUsers: PropTypes.func,
  openUpdateModal: PropTypes.func
}

export default UserItem
