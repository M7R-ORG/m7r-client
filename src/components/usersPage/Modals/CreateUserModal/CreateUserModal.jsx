import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { BaseModal, Brand, FormButton, FormInput } from '../../../_exports'
import api from '../../../../api/api'
import { keyboardKey } from '../../../../constants/system'
import { translations } from '../../../../i18n'
import './CreateUserModal.scss'

const toUserData = (user) => ({
  email: user?.email || '',
  login: user?.login || '',
  birthday: user?.birthday || '',
  password: ''
})

function CreateUserModal({ className = '', isActive = false, setIsActive, refreshUsers, user }) {
  const { formatMessage } = useIntl()
  const [userInfo, setUserInfo] = useState(toUserData(user))
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const resetUser = useCallback(() => {
    setUserInfo(toUserData(user))
    setErrorMessage('')
  }, [user])

  const changeHandler = (field) => (event) => {
    setUserInfo((prevUser) => ({ ...prevUser, [field]: event.target.value }))
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const { email, login, password, birthday } = userInfo

      if (!email || !login || (!user && !password)) {
        throw new Error(formatMessage(translations.admin.users.requiredFields))
      }

      const payload = { email, login, birthday: birthday || null, password: password || null }

      const { data, response } = user
        ? await api.user.updateUser({ id: user.id, ...payload })
        : await api.user.createUser(payload)

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error(formatMessage(translations.common.somethingWentWrong))
      }

      if (data.isSuccess) {
        setIsActive(false)
        refreshUsers()
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const submitKeyDownHandler = (event) => {
    if (event.key === keyboardKey.enter && !isLoading) {
      submitHandler()
    }
  }

  useEffect(() => {
    resetUser()
  }, [isActive, resetUser])

  return (
    <div className="c-create-user-modal" onKeyDown={submitKeyDownHandler} role="presentation">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <>
          <div className="header">
            <div className="brand">
              <Brand className="brand">M|7|R</Brand>
            </div>
          </div>

          <div className="content">
            <FormInput
              className="form-input"
              type="email"
              placeholder={formatMessage(translations.common.email)}
              onChange={changeHandler('email')}
              value={userInfo.email}
              pattern=".*"
              required
            />

            <FormInput
              className="form-input"
              type="text"
              placeholder={formatMessage(translations.common.login)}
              onChange={changeHandler('login')}
              value={userInfo.login}
              pattern=".*"
              required
            />

            <FormInput
              className="form-input"
              type="password"
              placeholder={
                user
                  ? formatMessage(translations.admin.users.newPassword)
                  : formatMessage(translations.common.password)
              }
              autoComplete="new-password"
              onChange={changeHandler('password')}
              value={userInfo.password}
              pattern=".*"
              isPassword
              required={!user}
            />

            <FormInput
              className="form-input"
              type="date"
              placeholder={formatMessage(translations.common.birthday)}
              onChange={changeHandler('birthday')}
              value={userInfo.birthday}
            />

            {errorMessage && <div className="error">{errorMessage}</div>}
          </div>

          <div className="footer">
            <div className="create-btn">
              <FormButton className="form-btn" onClick={submitHandler} isLoading={isLoading}>
                {user
                  ? formatMessage(translations.admin.update)
                  : formatMessage(translations.admin.create)}
              </FormButton>
            </div>
          </div>
        </>
      </BaseModal>
    </div>
  )
}

CreateUserModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  refreshUsers: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    login: PropTypes.string,
    birthday: PropTypes.string
  })
}

export default CreateUserModal
