import PropTypes from 'prop-types'
import ImgWrapper from '../ImgWrapper/ImgWrapper'
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder'
import Loader2 from '../Loader/Loader2/Loader2'
import { getImageUrl, imageVariant } from '../../../utils/helpers/filestorageHelper'
import './Avatar.scss'

function Avatar({ className = '', imageId, name, onClick, isLazy = false, variant = imageVariant.thumb }) {
  const isLoading = imageId === undefined
  const hasImage = Boolean(imageId)

  return (
    <div className={`c-avatar ${className}`} onClick={onClick} role="presentation">
      {isLoading && <Loader2 className="avatar-loader" />}
      {!isLoading && !hasImage && <AvatarPlaceholder name={name} />}
      {hasImage && (
        <ImgWrapper
          className="avatar-image"
          src={getImageUrl(imageId, variant)}
          alt={name || 'avatar'}
          isLazy={isLazy}
        />
      )}
    </div>
  )
}

Avatar.propTypes = {
  className: PropTypes.string,
  imageId: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  isLazy: PropTypes.bool,
  variant: PropTypes.oneOf(Object.values(imageVariant)),
}

export default Avatar
