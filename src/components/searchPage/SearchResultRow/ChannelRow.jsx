import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import SearchResultRow from './SearchResultRow'
import { translations } from '../../../i18n'

function ChannelRow({ channel, onOpen = () => {} }) {
  const { formatMessage } = useIntl()

  return (
    <SearchResultRow
      imageId={channel.imageId}
      name={channel.name}
      title={channel.name}
      subtitle={formatMessage(translations.search.publicChannel)}
      action={formatMessage(translations.search.join)}
      onClick={onOpen}
    />
  )
}

ChannelRow.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imageId: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  onOpen: PropTypes.func
}

export default ChannelRow
