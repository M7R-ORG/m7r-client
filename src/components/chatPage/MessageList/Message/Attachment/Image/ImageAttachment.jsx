import PropTypes from 'prop-types'
import { getImageUrl, imageVariant } from '../../../../../../utils/helpers/filestorageHelper'
import './ImageAttachment.scss'

function ImageAttachment({ className = '', attachment }) {
  return (
    <div className={`c-image-attachment ${className}`}>
      <img
        className="image"
        src={getImageUrl(attachment.fileId, imageVariant.preview)}
        alt="attachment"
        loading="lazy"
      />
    </div>
  )
}

ImageAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    fileId: PropTypes.string,
    type: PropTypes.string
  })
}

export default ImageAttachment
