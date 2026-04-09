import PropTypes from 'prop-types'
import ImgWrapper from '../ImgWrapper/ImgWrapper'
import AvatarPlaceholder from '../AvatarPlaceholder/AvatarPlaceholder'
import Loader2 from '../Loader/Loader2/Loader2'
import './Avatar.scss'

function Avatar({ className = '', image, name, onClick, isLazy = false }) {
  const isLoading = image === undefined
  const hasImage = Boolean(image)

  return (
    <div className={`c-avatar ${className}`} onClick={onClick} role="presentation">
      {isLoading && <Loader2 className="avatar-loader" />}
      {!isLoading && !hasImage && <AvatarPlaceholder name={name} />}
      {hasImage && (
        <ImgWrapper
          className="avatar-image"
          src={`data:image/jpeg;base64, ${image}`}
          alt={name || 'avatar'}
          isLazy={isLazy}
        />
      )}
    </div>
  )
}

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  isLazy: PropTypes.bool,
}

export default Avatar
