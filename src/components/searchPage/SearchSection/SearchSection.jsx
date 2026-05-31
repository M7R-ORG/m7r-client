import PropTypes from 'prop-types'

function SearchSection({
  title,
  items = [],
  showHeader = false,
  hasMore = false,
  isLoadingMore = false,
  onSeeAll = () => {},
  renderRow = () => null
}) {
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
              See all →
            </button>
          )}
        </header>
      )}
      <div className="items">{items.map(renderRow)}</div>
      {isLoadingMore && <div className="load-more-hint">Loading more…</div>}
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
