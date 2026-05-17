import PropTypes from 'prop-types'
import Loader2 from '../../../../../common/Loader/Loader2/Loader2'
import { useImageUrl } from '../../../../../../hooks/_exports'
import { imageVariant } from '../../../../../../utils/helpers/filestorageHelper'
import './ImageAttachment.scss'

function ImageAttachment({ className = '', attachment }) {
  const src = useImageUrl(attachment.fileId, imageVariant.preview)

  return (
    <div className={`c-image-attachment ${className}`}>
      {src ? (
        <img className="image" src={src} alt="attachment" loading="lazy" />
      ) : (
        <div className="image">
          <Loader2 className="image-loader" />
        </div>
      )}
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
