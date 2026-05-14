import config from '../../config/configuration'
import { services } from '../../constants/system'

const path = `/api/${services.files}`

const imageVariant = {
  thumb: 'thumb',
  preview: 'preview',
  original: 'original'
}

const getImageUrl = (id, variant = imageVariant.thumb) =>
  `${config.server.url}${path}/img/${id}?variant=${variant}`

const getFileUrl = (id) => `${config.server.url}${path}/${id}`

export { getImageUrl, getFileUrl, imageVariant }
