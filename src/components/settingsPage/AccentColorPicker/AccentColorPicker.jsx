import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { accentColor } from '../../../constants/system'
import { setAccentColor } from '../../../redux/slices/systemSlice'
import { translations } from '../../../i18n'
import { CheckIcon } from '../../common/Icon/_exports'
import './AccentColorPicker.scss'

function AccentColorPicker({ className = '' }) {
  const selectedAccent = useSelector((state) => state.system.accentColor)
  const dispatch = useDispatch()
  const { formatMessage } = useIntl()

  return (
    <div className={`c-accent-color-picker ${className}`}>
      {Object.values(accentColor).map((accent) => {
        const isActive = accent === selectedAccent

        return (
          <button
            key={accent}
            type="button"
            className={`accent-option ${isActive ? 'active' : ''}`}
            data-accent={accent}
            aria-pressed={isActive}
            onClick={() => dispatch(setAccentColor(accent))}
          >
            <span className="accent-swatch">
              {isActive && <CheckIcon className="accent-check" />}
            </span>
            <span className="accent-name">
              {formatMessage(translations.settings.accents[accent])}
            </span>
          </button>
        )
      })}
    </div>
  )
}

AccentColorPicker.propTypes = {
  className: PropTypes.string
}

export default AccentColorPicker
