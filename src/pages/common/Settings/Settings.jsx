import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { PageHeader } from '../../../components/_exports'
import { language, theme } from '../../../constants/system'
import { setLanguage, setTheme } from '../../../redux/slices/systemSlice'
import { translations } from '../../../i18n'
import LightThemeIcon from '../../../components/common/Sidebar/SidebarTheme/LightThemeIcon/LightThemeIcon'
import DarkThemeIcon from '../../../components/common/Sidebar/SidebarTheme/DarkThemeIcon/DarkThemeIcon'
import ChatBackground from '../../../components/common/ChatBackground/ChatBackground'
import SettingsSection from '../../../components/settingsPage/SettingsSection/SettingsSection'
import SettingsField from '../../../components/settingsPage/SettingsField/SettingsField'
import SegmentedControl from '../../../components/settingsPage/SegmentedControl/SegmentedControl'
import AccentColorPicker from '../../../components/settingsPage/AccentColorPicker/AccentColorPicker'
import ChatBackgroundPicker from '../../../components/settingsPage/ChatBackgroundPicker/ChatBackgroundPicker'
import SettingsSelect from '../../../components/settingsPage/SettingsSelect/SettingsSelect'
import ChatPreview from '../../../components/settingsPage/ChatPreview/ChatPreview'
import './Settings.scss'

const languageNames = {
  [language.english]: 'English',
  [language.russian]: 'Русский'
}

function Settings() {
  const systemTheme = useSelector((state) => state.system.theme)
  const accentColor = useSelector((state) => state.system.accentColor)
  const chatBackground = useSelector((state) => state.system.chatBackground)
  const dispatch = useDispatch()
  const { formatMessage, locale: systemLanguage } = useIntl()

  const themeOptions = [
    {
      value: theme.light,
      label: formatMessage(translations.common.theme.light),
      icon: <LightThemeIcon />
    },
    {
      value: theme.dark,
      label: formatMessage(translations.common.theme.dark),
      icon: <DarkThemeIcon />
    }
  ]

  const languageOptions = Object.values(language).map((value) => ({
    value,
    label: languageNames[value]
  }))

  return (
    <div className="p-settings">
      <PageHeader
        className="settings-header"
        text={formatMessage(translations.settings.title)}
        description={formatMessage(translations.settings.description)}
      />

      <div className="settings-content">
        <SettingsSection
          title={formatMessage(translations.settings.appearance.title)}
          description={formatMessage(translations.settings.appearance.description)}
        >
          <ChatBackground className="settings-preview">
            <ChatPreview />
          </ChatBackground>

          <SettingsField label={formatMessage(translations.settings.appearance.theme)}>
            <SegmentedControl
              options={themeOptions}
              value={systemTheme}
              onChange={(value) => dispatch(setTheme(value))}
            />
          </SettingsField>

          <SettingsField
            label={formatMessage(translations.settings.appearance.accentColor)}
            hint={formatMessage(translations.settings.accents[accentColor])}
          >
            <AccentColorPicker />
          </SettingsField>

          <SettingsField
            label={formatMessage(translations.settings.appearance.chatBackground)}
            hint={formatMessage(translations.settings.backgrounds[chatBackground])}
          >
            <ChatBackgroundPicker />
          </SettingsField>
        </SettingsSection>

        <SettingsSection title={formatMessage(translations.settings.language.title)}>
          <SettingsField label={formatMessage(translations.settings.language.interface)}>
            <SettingsSelect
              options={languageOptions}
              value={systemLanguage}
              onChange={(value) => dispatch(setLanguage(value))}
            />
          </SettingsField>
        </SettingsSection>
      </div>
    </div>
  )
}

export default Settings
