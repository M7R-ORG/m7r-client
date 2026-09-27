import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { translations } from '../../../i18n'

function SearchSection({
  title,
  items = [],
  showHeader = false,
  hasMore = false,
  isLoadingMore = false,
  onSeeAll = () => {},
  renderRow = () => null
}) {
  const { formatMessage } = useIntl()

  if (items.length === 0) {
    return null
  }

  return (
    <section className="section">
      {showHeader && (
        <header className="section-header">
          <h3>{title}</h3>
          <span className="section-count">{items.length}</span>
          {hasMore && (
            <button type="button" className="see-all" onClick={onSeeAll}>
              {formatMessage(translations.search.seeAll)}
            </button>
          )}
        </header>
      )}
      <div className="items">{items.map(renderRow)}</div>
      {isLoadingMore && (
        <div className="load-more-hint">{formatMessage(translations.search.loadingMore)}</div>
      )}
    </section>
  )
}

SearchSection.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  showHeader: PropTypes.bool,
  hasMore: PropTypes.bool,
  isLoadingMore: PropTypes.bool,
  onSeeAll: PropTypes.func,
  renderRow: PropTypes.func
}

export default SearchSection
