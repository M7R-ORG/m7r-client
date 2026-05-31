import PropTypes from 'prop-types'
import FileAttachment from './File/FileAttachment'
import ImageAttachment from './Image/ImageAttachment'
import {
  isFileAttachmentType,
  isImageAttachmentType
} from '../../../../../utils/helpers/attachmentTypeHelper'
import './Attachment.scss'

const attachmentTypeMapper = (attachment) => {
  if (isImageAttachmentType(attachment.type)) {
    return <ImageAttachment attachment={attachment} />
  }
  if (isFileAttachmentType(attachment.type)) {
    return <FileAttachment attachment={attachment} />
  }
  return null
}

function Attachment({ className = '', data = null, onClick }) {
  return (
    <div className={`c-attachment ${className}`} onClick={onClick} role="presentation">
      {attachmentTypeMapper(data)}
    </div>
  )
}

Attachment.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    fileId: PropTypes.string,
    type: PropTypes.string
  }),
  onClick: PropTypes.func
}

export default Attachment
