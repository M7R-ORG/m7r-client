import PropTypes from 'prop-types'
import './AvatarPlaceholder.scss'

const gradientsCount = 10

function getInitial(name) {
  const [initial] = name
  return initial.toUpperCase()
}

function getGradientClass(name) {
  const code = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length
  return `gradient-${code % gradientsCount}`
}

function AvatarPlaceholder({ className = '', name = '', onClick }) {
  const initial = getInitial(name || '?')
  const gradientClass = getGradientClass(name || '?')

  return (
    <div
      className={`c-avatar-placeholder ${gradientClass} ${className}`}
      onClick={onClick}
      role="presentation"
    >
      <span>{initial}</span>
    </div>
  )
}

AvatarPlaceholder.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}

export default AvatarPlaceholder
