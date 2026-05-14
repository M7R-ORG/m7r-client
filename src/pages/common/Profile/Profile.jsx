import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormButton from '../../../components/common/Button/FormButton/FormButton'
import Avatar from '../../../components/common/Avatar/Avatar'
import {UploadIcon} from '../../../components/common/Icon/_exports'
import api from '../../../api/api'
import FileInput from '../../../components/chatPage/NewMessage/FileInput/FileInput'
import { updateInfo } from '../../../redux/slices/userSlice'
import Loader1 from '../../../components/common/Loader/Loader1/Loader1'
import './Profile.scss'

function Profile() {
  const { login, email, imageId, birthday } = useSelector((state) => state.user.info)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const uploadImageHandler = async (event) => {
    const [file] = event.target.files

    setIsLoading(true)

    try {
      const { data: uploaded } = await api.filestorage.upload({ file })
      const { data: saved } = await api.account.uploadImage({ fileId: uploaded.fileId })
      dispatch(updateInfo({ imageId: saved?.imageId }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-profile">
      <div className="profile-content">
        <div className="image">
          {isLoading ? (
            <Loader1 className="img-loader" />
          ) : (
            <>
              <FileInput
                fileType="image/*"
                fileInputRef={fileInputRef}
                onChangeFile={uploadImageHandler}
              />

              <div
                className="update-container"
                onClick={() => fileInputRef.current.click()}
                role="presentation"
              >
                <UploadIcon className="update-icon" />
              </div>

              <Avatar imageId={imageId} name={login} />
            </>
          )}
        </div>

        <div className="main-info">
          <div className="login">
            <p>{login}</p>
          </div>
          <div className="email">
            <p>{email}</p>
          </div>
        </div>

        <div className="additional-info">
          <div className="birthday">
            <p>{birthday || 'null'}</p>
          </div>
        </div>

        <FormButton className="edit-btn">Edit profile</FormButton>
      </div>
    </div>
  )
}

export default Profile
