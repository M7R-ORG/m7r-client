import PropTypes from 'prop-types'
import Logo from '../../common/Logo/Logo'
import './LogoIndicator.scss'

const fullFill = 100
const loadingFill = 26

const indicatorState = {
  ready: 'ready',
  loading: 'loading',
  error: 'error'
}

const getFill = ({ progress, isLoading, isError }) => {
  if (isLoading) {
    return loadingFill
  }

  if (isError) {
    return fullFill
  }

  return progress * fullFill
}

function LogoIndicator({ className = '', progress = 0, isLoading = false, isError = false }) {
  const fill = getFill({ progress, isLoading, isError })
  const stateClass = [
    progress === 1 && indicatorState.ready,
    isLoading && indicatorState.loading,
    isError && indicatorState.error
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`c-logo-indicator ${stateClass} ${className}`}>
      <svg className="ring" viewBox="0 0 96 96" aria-hidden="true">
        <circle className="ring-track" cx="48" cy="48" r="45" />
        <circle
          className={`ring-bar ${fill ? '' : 'empty'}`}
          cx="48"
          cy="48"
          r="45"
          pathLength={fullFill}
          strokeDasharray={`${fill} ${fullFill}`}
        />
      </svg>

      <Logo className="logo" />

      {isError && (
        <div className="error-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round">
            <path d="M12 5v8.5M12 19v.1" strokeWidth="3.4" />
          </svg>
        </div>
      )}
    </div>
  )
}

LogoIndicator.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
}

export default LogoIndicator
