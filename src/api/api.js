import accountApi from './requests/accountApi'
import authApi from './requests/authApi'
import userApi from './requests/userApi'
import channelApi from './requests/channelApi'
import chatApi from './requests/chatApi'
import aiProfileApi from './requests/aiProfileApi'
import filestorageApi from './requests/filestorageApi'

const api = {
  auth: authApi,
  account: accountApi,
  user: userApi,
  channel: channelApi,
  chat: chatApi,
  aiProfile: aiProfileApi,
  filestorage: filestorageApi
}

export default api
