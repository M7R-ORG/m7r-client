import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import config from '../../../../config/configuration'
import Message from '../Message/Message'
import ImgWrapper from '../../../common/ImgWrapper/ImgWrapper'
import usePageSection from '../../../../hooks/usePageSection'
import './MessageGroup.scss'

function MessageGroup({ className = '', group = null, observerRef = null }) {
  const { accountSection } = usePageSection()
  const { authorId, authorLogin, image, createdAt, messages } = group
  const userId = useSelector((state) => state.auth.info.id)
  const isMyGroup = +userId === +authorId
  const myGroupClass = isMyGroup ? 'my-group' : ''

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/channels/direct-channel.jpg`

  const formattedDate = moment(createdAt).format('HH:mm')

  const imgClickHandler = () => {
    accountSection.set(authorId)
  }

  return (
    <div className={`c-message-group ${className} ${myGroupClass}`}>
      <div className="author-img">
        <ImgWrapper src={imageSrc} alt="user-img" onClick={imgClickHandler} isLazy />
      </div>

      <div className="data-wrapper">
        <div className="group-header">
          <div className="group-author" onClick={imgClickHandler} role="presentation">
            {authorLogin}
          </div>
          <div className="group-time">{formattedDate}</div>
        </div>

        <div className="group-messages">
          {messages.map((message) => (
            <Message
              observerRef={observerRef}
              key={message.id}
              message={message}
              className={myGroupClass}
              isMyMessage={isMyGroup}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

MessageGroup.propTypes = {
  className: PropTypes.string,
  group: PropTypes.shape({
    id: PropTypes.number,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string
      })
    ),
    authorId: PropTypes.number,
    authorLogin: PropTypes.string,
    createdAt: PropTypes.string,
    image: PropTypes.string
  }),
  observerRef: PropTypes.shape({
    current: PropTypes.instanceOf(IntersectionObserver)
  })
}

export default MessageGroup
