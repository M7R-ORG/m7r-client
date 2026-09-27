import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import PaginationIcon from './PaginationIcon/PaginationIcon'
import { translations } from '../../../i18n'
import './Pagination.scss'

function Pagination({
  className = '',
  pageNumber = 0,
  pagesCount = 0,
  onNext = () => {},
  onPrev = () => {}
}) {
  const { formatMessage } = useIntl()
  const isPrevDisabled = pageNumber <= 0
  const isNextDisabled = pageNumber + 1 >= pagesCount

  return (
    <div className={`c-pagination ${className}`}>
      <div
        className={`pagination-previous ${isPrevDisabled ? 'disabled' : ''}`}
        onClick={() => !isPrevDisabled && onPrev()}
        role="presentation"
      >
        <span className="pagination-arrow">
          <PaginationIcon className="pagination-arrow-icon" />
        </span>
        <span className="pagination-text">
          {formatMessage(translations.common.pagination.prev)}
        </span>
      </div>

      <div className="pagination-info">
        <span className="current-index">{pageNumber + 1}</span>{' '}
        {formatMessage(translations.common.pagination.of)} <span>{pagesCount}</span>
      </div>

      <div
        className={`pagination-next ${isNextDisabled ? 'disabled' : ''}`}
        onClick={() => !isNextDisabled && onNext()}
        role="presentation"
      >
        <span className="pagination-text">
          {formatMessage(translations.common.pagination.next)}
        </span>
        <span className="pagination-arrow">
          <PaginationIcon className="pagination-arrow-icon" />
        </span>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  className: PropTypes.string,
  pageNumber: PropTypes.number,
  pagesCount: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
}

export default Pagination
