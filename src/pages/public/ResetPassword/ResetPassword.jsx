import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Brand, FormButton, FormInput, Logo, NavLink } from '../../../components/_exports'
import ThemeToggle from '../../../components/common/ThemeToggle/ThemeToggle'
import { page, keyboardKey } from '../../../constants/system'
import api from '../../../api/api'
import { translations } from '../../../i18n'
import cPasswordValidator from '../../../utils/validators/cPasswordValidator'
import passwordValidator from '../../../utils/validators/passwordValidator'
import getValidationErrorMessage from '../../../utils/helpers/errorHelper'
import RedirectModal from '../../../components/common/Modal/RedirectModal/RedirectModal'
import './ResetPassword.scss'

const redirectModalDelay = 3

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const { formatMessage } = useIntl()
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveBtn, setIsActiveBtn] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidCPassword, setIsValidCPassword] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetToken = searchParams.get('token')

  useEffect(() => {
    const isActive = resetToken && isValidPassword && isValidCPassword

    setMessage('')
    setIsActiveBtn(!!isActive)
  }, [resetToken, isValidPassword, isValidCPassword])

  const resetPasswordHandler = async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.auth.resetPassword({
        resetToken,
        password
      })

      if (response?.data?.errors) {
        throw new Error(getValidationErrorMessage(response.data.errors))
      }

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data) {
        throw new Error(formatMessage(translations.common.somethingWentWrong))
      }

      setIsCompleted(true)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const submitKeyDownHandler = (event) => {
    if (event.key === keyboardKey.enter && !isLoading) {
      resetPasswordHandler()
    }
  }

  return (
    <div className="p-reset-password">
      <ThemeToggle className="guest-theme-toggle" />
      <RedirectModal
        isActive={isCompleted}
        link={page.login}
        delay={redirectModalDelay}
        title={formatMessage(translations.common.success)}
        message={formatMessage(translations.auth.resetPassword.redirect)}
      />

      <div className="reset-password-header">
        <div className="brand-wrapper">
          <Brand className="brand">M|7|R</Brand>
        </div>
        <div className="sign-in-wrapper">
          <NavLink className="sign-in" link={page.login}>
            {formatMessage(translations.auth.signIn)}
          </NavLink>
        </div>
      </div>

      <div className="reset-password-content">
        <div className="reset-password-panel" onKeyDown={submitKeyDownHandler} role="presentation">
          <div className="logo-wrapper">
            <Logo className="logo" />
          </div>

          <div className="title">{formatMessage(translations.auth.resetPassword.title)}</div>

          <div className="client-message">
            {message || formatMessage(translations.auth.resetPassword.description)}
          </div>

          <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="inputs-wrapper">
              <FormInput
                className="password-input"
                type="password"
                placeholder={formatMessage(translations.auth.resetPassword.newPassword)}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                validator={passwordValidator}
                onValid={setIsValidPassword}
                required
                isPassword
              />

              <FormInput
                className="password-input"
                type="password"
                placeholder={formatMessage(translations.auth.resetPassword.confirmPassword)}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                value={confirmationPassword}
                validator={(cPassword) => cPasswordValidator(password, cPassword)}
                onValid={setIsValidCPassword}
                required
              />
            </div>

            <div className="button-wrapper">
              <FormButton
                className="submit-button"
                isActive={isActiveBtn}
                isLoading={isLoading}
                onClick={resetPasswordHandler}
              >
                {formatMessage(translations.auth.resetPassword.submit)}
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
