import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { page } from '../../../../constants/system'
import { translations } from '../../../../i18n'
import { useAuth } from '../../../../hooks/_exports'
import MenuIcon from '../../Icon/MenuIcon/MenuIcon'
import DropDown from '../../DropDown/DropDown'
import Avatar from '../../Avatar/Avatar'
import './SidebarProfile.scss'
import { LogoutIcon, ProfileIcon, SettingsIcon } from '../../Icon/_exports'

function SidebarProfile({ className = '', isExpand = false }) {
  const { login, email, imageId } = useSelector((state) => state.user.info)
  const expandClass = isExpand ? 'expand' : ''
  const { logOut } = useAuth()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()

  const menuItems = [
    {
      icon: <ProfileIcon />,
      title: formatMessage(translations.common.menu.profile),
      onClick: () => {
        navigate(page.profile)
      }
    },
    {
      icon: <SettingsIcon />,
      title: formatMessage(translations.common.menu.settings),
      onClick: () => {
        navigate(page.settings)
      }
    },
    {
      icon: <LogoutIcon />,
      title: formatMessage(translations.common.menu.logout),
      onClick: () => {
        logOut()
        navigate(page.login)
      }
    }
  ]

  return (
    <div className={`c-sidebar-profile ${className} ${expandClass}`}>
      <div className="sidebar-profile-image">
        <Avatar imageId={imageId} name={login} onClick={() => navigate(page.profile)} />
      </div>

      <div className="sidebar-profile-info">
        <div className="sidebar-profile-login">{login}</div>
        <div className="sidebar-profile-email">{email}</div>
      </div>

      <div className="sidebar-profile-menu">
        <DropDown items={menuItems} className="right">
          <MenuIcon className="menu-icon" />
        </DropDown>
      </div>
    </div>
  )
}

SidebarProfile.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarProfile
