import PropTypes from 'prop-types'
import { activityStatus } from '../../../constants/system'
import SearchResultRow from './SearchResultRow'

const isUserOnline = (user) =>
  (user.activityStatus || '').toLowerCase() === activityStatus.online

function PersonRow({ person, onOpen = () => {} }) {
  return (
    <SearchResultRow
      imageId={person.imageId}
      name={person.login}
      title={person.login}
      subtitle={
        isUserOnline(person) ? (
          <span className="online">Online</span>
        ) : (
          person.email || ''
        )
      }
      action="Message"
      onClick={onOpen}
    />
  )
}

PersonRow.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    imageId: PropTypes.string,
    login: PropTypes.string,
    email: PropTypes.string,
    activityStatus: PropTypes.string
  }).isRequired,
  onOpen: PropTypes.func
}

export default PersonRow
