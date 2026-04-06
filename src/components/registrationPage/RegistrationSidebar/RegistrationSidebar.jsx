import PropTypes from 'prop-types'
import { EmailIcon, ProfileIcon, CalendarIcon, LockIcon } from '../../common/Icon/_exports'
import './RegistrationSidebar.scss'

const stepsData = [
  {
    title: 'Enter your email',
    description: 'Your email will be used to log into your account',
    icon: <EmailIcon />
  },
  {
    title: 'Choose a username',
    description: 'This is how other users will find and recognize you',
    icon: <ProfileIcon />
  },
  {
    title: 'Create a password',
    description: 'Use a strong password to keep your account secure',
    icon: <LockIcon />
  },
  {
    title: 'Your birthday',
    description: 'Used for age verification and personalization',
    icon: <CalendarIcon />
  }
]

function RegistrationSidebar({ currentStep, totalSteps }) {
  return (
    <div className="c-registration-sidebar">
      <div className="sidebar-title">Create your account</div>

      <div className="sidebar-steps">
        {stepsData.map((step, index) => (
          <div
            key={step.title}
            className={`sidebar-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-text">
              <div className="step-name">{step.title}</div>
              <div className="step-desc">{step.description}</div>
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
          Step {currentStep + 1} of {totalSteps}
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
