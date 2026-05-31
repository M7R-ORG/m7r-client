import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import api from '../../../../../api/api'
import Loader1 from '../../../../common/Loader/Loader1/Loader1'
import PreviewImageAttachment from './PreviewImageAttachment/PreviewImageAttachment'
import PreviewFileAttachment from './PreviewFileAttachment/PreviewFileAttachment'
import { RemoveIcon } from '../../../../common/Icon/_exports'
import {
  isFileAttachmentType,
  isImageAttachmentType
} from '../../../../../utils/helpers/attachmentTypeHelper'
import './PreviewAttachment.scss'

const attachmentTypeMapper = (attachment) => {
  let component = null

  if (isImageAttachmentType(attachment.type)) {
    component = <PreviewImageAttachment className="preview-attachment" attachment={attachment} />
  } else if (isFileAttachmentType(attachment.type)) {
    component = <PreviewFileAttachment className="preview-attachment" attachment={attachment} />
  }

  return component
}

function PreviewAttachment({ className = '', attachment, setAttachFiles }) {
  const isUploaded = attachment.id !== undefined
  const [fileId, setFileId] = useState(attachment.fileId)
  const chatHub = useSelector((state) => state.signalR.chatHub)
  const isPending = !fileId

  const removeFile = useCallback(
    (attachmentUId) => {
      if (isPending) return

      chatHub.connection
        .invoke(chatMethod.removeFile, { uniqueId: attachmentUId })
        .then(() => {
          if (fileId) {
            api.filestorage.delete({ id: fileId }).catch()
          }
          setAttachFiles((files) => files.filter((file) => file.uniqueId !== attachmentUId))
        })
        .catch()
    },
    [chatHub, setAttachFiles, isPending, fileId]
  )

  useEffect(() => {
    if (isUploaded) return

    const { file } = attachment

    api.filestorage
      .upload({ file })
      .then((result) => {
        const uploadedFileId = result.data.fileId
        setFileId(uploadedFileId)

        return chatHub.connection.invoke(chatMethod.uploadFile, {
          uniqueId: attachment.uniqueId,
          fileId: uploadedFileId,
          type: file.type,
          name: file.name,
          size: file.size,
          channelId: attachment.channelId
        })
      })
      .catch(() => {})
  }, [chatHub, attachment, isUploaded])

  return (
    <div className={`c-preview-attachment ${className}`}>
      {isPending && <Loader1 className="img-loader" />}

      <div
        className="remove-container"
        onClick={() => removeFile(attachment.uniqueId)}
        role="presentation"
      >
        <RemoveIcon className="remove-icon" />
      </div>

      {attachmentTypeMapper({ ...attachment, fileId })}
    </div>
  )
}

PreviewAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    id: PropTypes.number,
    file: PropTypes.instanceOf(File),
    fileId: PropTypes.string,
    uniqueId: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    channelId: PropTypes.number
  }),
  setAttachFiles: PropTypes.func
}

export default PreviewAttachment
