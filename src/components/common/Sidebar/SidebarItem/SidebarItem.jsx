import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import './SidebarItem.scss'

function SidebarItem({
  isExpand = false,
  className = '',
  title = '',
  children = null,
  link = '',
  noticeCounter = 0
}) {
  const { pathname } = useLocation()
  const expandClass = isExpand ? 'expand' : ''
  const activeClass = link && pathname.startsWith(link) ? 'active' : ''
  const counter = noticeCounter > 99 ? '99+' : noticeCounter

  return (
    <Link className={`c-sidebar-item ${className} ${expandClass} ${activeClass}`} to={link}>
      <div className="sidebar-item-active-indicator" />
      <div className="sidebar-item-icon">{children}</div>
      <div className="sidebar-item-title">{title}</div>
      <div className="sidebar-item-notice-counter">
        <div className="notice-counter-wrapper">{counter}</div>
      </div>
    </Link>
  )
}

SidebarItem.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool,
  title: PropTypes.string,
  link: PropTypes.string,
  noticeCounter: PropTypes.number,
  children: PropTypes.element
}

export default SidebarItem
