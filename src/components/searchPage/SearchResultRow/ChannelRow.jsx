import PropTypes from 'prop-types'
import SearchResultRow from './SearchResultRow'

function ChannelRow({ channel, onOpen = () => {} }) {
  return (
    <SearchResultRow
      imageId={channel.imageId}
      name={channel.name}
      title={channel.name}
      subtitle="Public channel"
      action="Join"
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
