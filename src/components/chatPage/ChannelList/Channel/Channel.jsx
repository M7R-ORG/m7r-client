import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Avatar from '../../../common/Avatar/Avatar'
import './Channel.scss'

function Channel({ onClick = () => {}, isActive = false, className = '', data = null }) {
  const [counter, setCounter] = useState(0)

  const { image, lastMessage, name, lastActivity, type, unreadMessagesCount } = data

  const date = moment(lastActivity)

  const isActiveClass = isActive ? 'active' : ''

  const formattedLastActivity = date.isSame(moment(), 'day')
    ? date.format('HH:mm')
    : date.format('D MMM')


  useEffect(() => {
    setCounter(unreadMessagesCount)
  }, [unreadMessagesCount])

  return (
    <div
      className={`c-channel ${isActiveClass} ${className}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="channel-image">
        <Avatar image={image} name={name} isLazy />
      </div>

      <div className="channel-info">
        <div className="channel-info-top">
          <div className="title">{name ?? 'none'}</div>
          <div className="activity">{formattedLastActivity}</div>
        </div>

        <div className="channel-info-bottom">
          {lastMessage ? (
            <>
              <div className="message">
                <b>
                  <span>{lastMessage.author}</span>
                  <span>: </span>
                </b>
                <span>{lastMessage.content}</span>
              </div>
              {!!counter && (
                <div className="counter">
                  <div>{counter}</div>
                </div>
              )}
            </>
          ) : (
            <div className="message empty">No messages yet</div>
          )}
        </div>
      </div>
    </div>
  )
}

Channel.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.shape({
    image: PropTypes.string,
    lastMessage: PropTypes.shape({
      author: PropTypes.string,
      content: PropTypes.string
    }),
    name: PropTypes.string,
    lastActivity: PropTypes.string,
    type: PropTypes.string,
    unreadMessagesCount: PropTypes.number
  }),
  isActive: PropTypes.bool
}

export default Channel
