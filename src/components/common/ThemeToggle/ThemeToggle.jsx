import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import LightThemeIcon from '../Sidebar/SidebarTheme/LightThemeIcon/LightThemeIcon'
import DarkThemeIcon from '../Sidebar/SidebarTheme/DarkThemeIcon/DarkThemeIcon'
import { theme } from '../../../constants/system'
import { setTheme } from '../../../redux/slices/systemSlice'
import { translations } from '../../../i18n'
import './ThemeToggle.scss'

function ThemeToggle({ className = '' }) {
  const systemTheme = useSelector((state) => state.system.theme)
  const dispatch = useDispatch()
  const { formatMessage } = useIntl()

  const isDark = systemTheme === theme.dark

  const toggleTheme = () => {
    dispatch(setTheme(isDark ? theme.light : theme.dark))
  }

  return (
    <div
      className={`c-theme-toggle ${className}`}
      onClick={toggleTheme}
      role="presentation"
      title={
        isDark
          ? formatMessage(translations.common.theme.switchToLight)
          : formatMessage(translations.common.theme.switchToDark)
      }
    >
      {isDark ? (
        <LightThemeIcon className="toggle-icon" />
      ) : (
        <DarkThemeIcon className="toggle-icon" />
      )}
    </div>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string
}

export default ThemeToggle
