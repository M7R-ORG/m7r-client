import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useIntl } from 'react-intl'
import Avatar from '../../../common/Avatar/Avatar'
import { shortDateFormat, translations } from '../../../../i18n'
import './Channel.scss'

function Channel({ onClick = () => {}, isActive = false, className = '', data = null }) {
  const { formatMessage, formatDate } = useIntl()
  const [counter, setCounter] = useState(0)

  const { imageId, lastMessage, name, lastActivity, unreadMessagesCount } = data

  const date = moment(lastActivity)

  const isActiveClass = isActive ? 'active' : ''

  const formattedLastActivity = date.isSame(moment(), 'day')
    ? date.format('HH:mm')
    : formatDate(lastActivity, shortDateFormat)


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
        <Avatar imageId={imageId} name={name} isLazy />
      </div>

      <div className="channel-info">
        <div className="channel-info-top">
          <div className="title">{name ?? formatMessage(translations.chat.noName)}</div>
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
            <div className="message empty">{formatMessage(translations.chat.noMessages)}</div>
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
    imageId: PropTypes.string,
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
