import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { channelType } from '../../../../constants/chat'
import { translations } from '../../../../i18n'
import './ChannelFilter.scss'

const filtersInfo = [
  {
    key: 1,
    title: translations.chat.filter.all,
    type: null
  },
  {
    key: 2,
    title: translations.chat.filter.public,
    type: channelType.public
  },
  {
    key: 3,
    title: translations.chat.filter.private,
    type: channelType.private
  },
  {
    key: 4,
    title: translations.chat.filter.direct,
    type: channelType.direct
  },
]

function ChannelFilter({ className = '', setType = () => {}, type = null }) {
  const { formatMessage } = useIntl()

  return (
    <div className={`c-channel-filter ${className}`}>
      {filtersInfo.map((info) => (
        <div
          key={info.key}
          className={`filter ${info.type === type ? 'selected' : ''}`}
          onClick={() => setType(info.type)}
          role="presentation"
        >
          <div className="title" title={formatMessage(info.title)}>
            {formatMessage(info.title)}
          </div>
        </div>
      ))}
    </div>
  )
}

ChannelFilter.propTypes = {
  className: PropTypes.string,
  setType: PropTypes.func,
  type: PropTypes.string
}

export default ChannelFilter
