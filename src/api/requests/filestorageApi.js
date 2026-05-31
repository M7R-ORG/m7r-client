import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.files}`

const filestorageApi = {
  upload: async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axiosInstance.post(`${path}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response
  },

  delete: async ({ id }) => {
    const response = await axiosInstance.delete(`${path}/${id}`)
    return response
  }
}

export default filestorageApi
