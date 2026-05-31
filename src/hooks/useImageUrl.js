import { useEffect, useState } from 'react'
import { getImageUrl, imageVariant } from '../utils/helpers/filestorageHelper'

const useImageUrl = (id, variant = imageVariant.thumb) => {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    setSrc(null)

    if (!id) {
      return undefined
    }

    const img = new Image()
    img.src = getImageUrl(id, variant)
    img.onload = () => setSrc(img.src)

    return () => {
      img.onload = null
    }
  }, [id, variant])

  return src
}

export default useImageUrl
