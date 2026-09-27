import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import './ChatBackground.scss'

function ChatBackground({ className = '', background = null, children = null }) {
  const chatBackground = useSelector((state) => state.system.chatBackground)

  return (
    <div
      className={`c-chat-background ${className}`}
      data-background={background ?? chatBackground}
    >
      {children}
    </div>
  )
}

ChatBackground.propTypes = {
  className: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ChatBackground
