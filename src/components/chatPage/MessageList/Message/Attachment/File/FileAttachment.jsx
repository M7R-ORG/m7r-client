import PropTypes from 'prop-types'
import { FileIcon } from '../../../../../common/Icon/_exports'
import { formatBytes, getFileExtension } from '../../../../../../utils/helpers/commonHelper'
import { getFileUrl } from '../../../../../../utils/helpers/filestorageHelper'
import './FileAttachment.scss'

function FileAttachment({ className = '', attachment }) {
  const { name, fileId, size } = attachment

  const fileExtension = getFileExtension(name)
  const formattedSize = formatBytes(size)

  return (
    <div className={`c-file-attachment ${className}`}>
      <div className="file-attachment-content">
        <div className="file-downloader-container">
          <a
            className="download-file-icon-container"
            href={getFileUrl(fileId)}
            download={name}
            aria-label={`Download ${name}`}
          >
            <FileIcon className="file-icon file-downloader-icon" />
          </a>
        </div>
        <div className="file-info-container">
          <div className="file-name">{name || 'None'}</div>
          <div className="file-info">
            <div className="file-extension">{fileExtension.toUpperCase() || 'NONE'}</div>
            <div className="file-size">{formattedSize}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

FileAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    fileId: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number
  })
}

export default FileAttachment
