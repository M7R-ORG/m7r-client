import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getImageUrl } from '../../../../../../utils/helpers/filestorageHelper'
import './PreviewImageAttachment.scss'

function PreviewImageAttachment({ className = '', attachment }) {
  const { file, fileId } = attachment
  const [localUrl, setLocalUrl] = useState(null)

  useEffect(() => {
    if (!file || fileId) return undefined

    const url = URL.createObjectURL(file)
    setLocalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file, fileId])

  const src = fileId ? getImageUrl(fileId) : localUrl

  return (
    <div className={`c-preview-image-attachment ${className}`}>
      {src ? (
        <img className="preview-file" src={src} alt="attachment" />
      ) : (
        <div className="preview-file" />
      )}
    </div>
  )
}

PreviewImageAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    file: PropTypes.instanceOf(File),
    fileId: PropTypes.string
  })
}

export default PreviewImageAttachment
