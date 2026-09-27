import PropTypes from 'prop-types'
import './PageHeader.scss'

function PageHeader({ className = '', text = '', description = '', children = null }) {
  return (
    <header className={`c-page-header ${className}`}>
      <div className="page-header-titles">
        <h1 className="page-header-text">{text}</h1>
        {description && <p className="page-header-description">{description}</p>}
      </div>

      {children && <div className="page-header-options">{children}</div>}
    </header>
  )
}

PageHeader.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
}

export default PageHeader
