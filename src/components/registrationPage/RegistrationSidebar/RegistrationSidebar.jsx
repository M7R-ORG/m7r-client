import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { EmailIcon, ProfileIcon, CalendarIcon, LockIcon } from '../../common/Icon/_exports'
import { translations } from '../../../i18n'
import './RegistrationSidebar.scss'

const stepsData = [
  {
    title: translations.auth.registration.steps.email.title,
    description: translations.auth.registration.steps.email.description,
    icon: <EmailIcon />
  },
  {
    title: translations.auth.registration.steps.login.title,
    description: translations.auth.registration.steps.login.description,
    icon: <ProfileIcon />
  },
  {
    title: translations.auth.registration.steps.password.title,
    description: translations.auth.registration.steps.password.description,
    icon: <LockIcon />
  },
  {
    title: translations.auth.registration.steps.birthday.title,
    description: translations.auth.registration.steps.birthday.description,
    icon: <CalendarIcon />
  }
]

function RegistrationSidebar({ currentStep, totalSteps }) {
  const { formatMessage } = useIntl()

  return (
    <div className="c-registration-sidebar">
      <div className="sidebar-title">{formatMessage(translations.auth.registration.title)}</div>

      <div className="sidebar-steps">
        {stepsData.map((step, index) => (
          <div
            key={step.title.id}
            className={`sidebar-step ${index === currentStep ? 'active' : ''} ${
              index < currentStep ? 'completed' : ''
            }`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-text">
              <div className="step-name">{formatMessage(step.title)}</div>
              <div className="step-desc">{formatMessage(step.description)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          {formatMessage(translations.auth.registration.progress, {
            current: currentStep + 1,
            total: totalSteps
          })}
        </div>
      </div>
    </div>
  )
}

RegistrationSidebar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
}

export default RegistrationSidebar
