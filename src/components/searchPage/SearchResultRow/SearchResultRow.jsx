import PropTypes from 'prop-types'
import Avatar from '../../common/Avatar/Avatar'
import './SearchResultRow.scss'

function SearchResultRow({
  imageId,
  name,
  title,
  subtitle = null,
  action,
  onClick = () => {}
}) {
  return (
    <button type="button" className="c-search-result-row" onClick={onClick}>
      <span className="row-avatar">
        <Avatar imageId={imageId} name={name} />
      </span>
      <span className="row-info">
        <span className="row-title">{title}</span>
        {subtitle && <span className="row-subtitle">{subtitle}</span>}
      </span>
      {action && <span className="row-action">{action}</span>}
    </button>
  )
}

SearchResultRow.propTypes = {
  imageId: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  action: PropTypes.string,
  onClick: PropTypes.func
}

export default SearchResultRow
