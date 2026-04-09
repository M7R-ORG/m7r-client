import PropTypes from 'prop-types'
import './AvatarPlaceholder.scss'

const gradients = [
  'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
  'linear-gradient(135deg, #6d28d9 0%, #c084fc 100%)',
  'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
  'linear-gradient(135deg, #7e22ce 0%, #d946ef 100%)',
  'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
  'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
  'linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #e879f9 100%)',
  'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #5b21b6 0%, #a78bfa 100%)',
]

function getInitial(name) {
  const [initial] = name
  return initial.toUpperCase()
}

function getGradient(name) {
  const code = name.charCodeAt(0) + name.charCodeAt(name.length - 1) + name.length
  return gradients[code % gradients.length]
}

function AvatarPlaceholder({ className = '', name = '', onClick }) {
  const initial = getInitial(name || '?')
  const background = getGradient(name || '?')

  return (
    <div
      className={`c-avatar-placeholder ${className}`}
      style={{ background }}
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
