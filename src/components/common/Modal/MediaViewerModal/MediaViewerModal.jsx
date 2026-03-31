import { useSelector } from 'react-redux'
import { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { BaseModal } from '../../../_exports'
import ArrowIcon from '../../Icon/ArrowIcon/ArrowIcon'
import { chatMethod } from '../../../../socket/hubHandlers'
import Loader2 from '../../Loader/Loader2/Loader2'
import './MediaViewerModal.scss'

const MIN_SCALE = 1
const MAX_SCALE = 5
const SCALE_STEP = 0.15

function MediaViewerModal({
  className = '',
  isActive = false,
  setIsActive = () => {},
  attachmentIds = [],
  defaultActiveAttachmentId
}) {
  const chatHub = useSelector((state) => state.signalR.chatHub)
  const [attachmentIndex, setAttachmentIndex] = useState(0)
  const [attachments, setAttachments] = useState([])
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const imageRef = useRef(null)

  const currentAttachment = attachments[attachmentIndex]

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    setAttachments([])
    resetZoom()
  }, [isActive, resetZoom])

  useEffect(() => {
    const index = attachmentIds.indexOf(defaultActiveAttachmentId)

    setAttachmentIndex(index)
  }, [defaultActiveAttachmentId, attachmentIds])

  useEffect(() => {
    if (isActive) {
      attachmentIds.forEach((attachmentId) => {
        chatHub.connection
          .invoke(chatMethod.loadFile, { attachmentId })
          .then((attachment) => {
            setAttachments((prevAttachments) =>
              [...prevAttachments, attachment].sort((prev, next) => prev.id - next.id)
            )
          })
          .catch(() => {})
      })
    }
  }, [chatHub, attachmentIds, isActive])

  useEffect(() => {
    resetZoom()
  }, [attachmentIndex, resetZoom])

  const prevItemHandler = async () => {
    setAttachmentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const nextItemHandler = async () => {
    setAttachmentIndex((prev) => (prev < attachments.length - 1 ? prev + 1 : prev))
  }

  const wheelHandler = (e) => {
    e.preventDefault()

    setScale((prev) => {
      const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta))

      if (next === MIN_SCALE) {
        setPosition({ x: 0, y: 0 })
      }

      return next
    })
  }

  const mouseDownHandler = (e) => {
    if (scale <= MIN_SCALE) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
  }

  useEffect(() => {
    if (!isDragging) return undefined

    const mouseMoveHandler = (e) => {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      })
    }

    const mouseUpHandler = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('mouseup', mouseUpHandler)

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [isDragging])

  const getCursorStyle = () => {
    if (scale <= MIN_SCALE) return 'zoom-in'
    if (isDragging) return 'grabbing'

    return 'grab'
  }

  return (
    <div className={`c-media-viewer-modal ${className}`} role="presentation">
      <BaseModal
        baseModalClassName="base-modal"
        className="viewer-modal"
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <div className="media-viewer">
          <div className="prev-item">
            <ArrowIcon onClick={prevItemHandler} className="arrow-icon" />
          </div>

          <div
            className="viewer-content"
            onWheel={wheelHandler}
            onMouseDown={mouseDownHandler}
            role="presentation"
          >
            {currentAttachment ? (
              <img
                ref={imageRef}
                className="image"
                src={`data:${currentAttachment.type};base64, ${currentAttachment.content}`}
                alt="attachment"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  cursor: getCursorStyle()
                }}
                draggable={false}
              />
            ) : (
              <Loader2 className="media-loader" />
            )}
          </div>

          <div className="next-item">
            <ArrowIcon onClick={nextItemHandler} className="arrow-icon" />
          </div>
        </div>
      </BaseModal>
    </div>
  )
}

MediaViewerModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  attachmentIds: PropTypes.arrayOf(PropTypes.number),
  defaultActiveAttachmentId: PropTypes.number
}

export default MediaViewerModal
