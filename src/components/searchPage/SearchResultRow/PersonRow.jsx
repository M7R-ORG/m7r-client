import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { activityStatus } from '../../../constants/system'
import SearchResultRow from './SearchResultRow'
import { translations } from '../../../i18n'

const isUserOnline = (user) =>
  (user.activityStatus || '').toLowerCase() === activityStatus.online

function PersonRow({ person, onOpen = () => {} }) {
  const { formatMessage } = useIntl()

  return (
    <SearchResultRow
      imageId={person.imageId}
      name={person.login}
      title={person.login}
      subtitle={
        isUserOnline(person) ? (
          <span className="online">{formatMessage(translations.common.online)}</span>
        ) : (
          person.email || ''
        )
      }
      action={formatMessage(translations.search.message)}
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
