import { services } from '../../constants/system'
import axiosInstance from '../axios'

const path = `/api/${services.chat}/account`

const accountApi = {
  profile: async () => {
    const response = await axiosInstance.get(`${path}/profile`)
    return response
  },

  image: async () => {
    const response = await axiosInstance.get(`${path}/image`)
    return response
  },

  uploadImage: async ({ fileId }) => {
    const response = await axiosInstance.post(`${path}/upload-image`, { fileId })
    return response
  },

  accounts: async ({ pageNumber, pageSize, searchField, signal }) => {
    const params = [
      `pagination.pageNumber=${pageNumber || 0}`,
      `pagination.pageSize=${pageSize || 100}`,
      `searchField=${searchField}`
    ]

    const response = await axiosInstance.get(`${path}/accounts?${params.join('&')}`, { signal })
    return response
  },

  accountById: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/accounts/${id}`)
    return response
  },

  imageByAccountId: async ({ id }) => {
    const response = await axiosInstance.get(`${path}/accounts/${id}/image`)
    return response
  },
}

export default accountApi
