import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FileIcon } from '../../../../../common/Icon/_exports'
import { formatBytes, getFileExtension } from '../../../../../../utils/helpers/commonHelper'
import { getFileUrl } from '../../../../../../utils/helpers/filestorageHelper'
import { translations } from '../../../../../../i18n'
import './FileAttachment.scss'

function FileAttachment({ className = '', attachment }) {
  const { formatMessage } = useIntl()
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
            aria-label={formatMessage(translations.chat.attachment.download, { name })}
          >
            <FileIcon className="file-icon file-downloader-icon" />
          </a>
        </div>
        <div className="file-info-container">
          <div className="file-name">
            {name || formatMessage(translations.chat.attachment.noName)}
          </div>
          <div className="file-info">
            <div className="file-extension">
              {fileExtension.toUpperCase() ||
                formatMessage(translations.chat.attachment.noExtension)}
            </div>
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
