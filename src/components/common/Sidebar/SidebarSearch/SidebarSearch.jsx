import PropTypes from 'prop-types'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { page } from '../../../../constants/system'
import SearchIcon from './SearchIcon/SearchIcon'
import './SidebarSearch.scss'

function SidebarSearch({ className = '', isExpand = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const urlQuery = searchParams.get('q') || ''
  const isOnSearchPage = location.pathname === page.search
  const expandClass = isExpand ? 'expand' : ''

  const onChange = (event) => {
    const next = event.target.value
    const target = next ? `${page.search}?q=${encodeURIComponent(next)}` : page.search
    navigate(target, { replace: isOnSearchPage })
  }

  const onIconClick = () => {
    if (!isOnSearchPage) {
      navigate(page.search)
    }
  }

  return (
    <div className={`c-sidebar-search ${className} ${expandClass}`}>
      <button
        type="button"
        className="search-icon-container"
        onClick={onIconClick}
        aria-label="Open search"
      >
        <SearchIcon className="search-icon" />
      </button>

      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={urlQuery}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

SidebarSearch.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SidebarSearch
