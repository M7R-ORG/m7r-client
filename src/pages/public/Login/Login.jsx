import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { translations } from '../../../i18n'
import { useAuth } from '../../../hooks/_exports'
import api from '../../../api/api'
import { page, keyboardKey } from '../../../constants/system'
import { Brand, FormButton, Logo, NavLink, FormInput } from '../../../components/_exports'
import ThemeToggle from '../../../components/common/ThemeToggle/ThemeToggle'
import getValidationErrorMessage from '../../../utils/helpers/errorHelper'
import './Login.scss'

function Login() {
  const navigate = useNavigate()
  const { logIn } = useAuth()
  const { formatMessage } = useIntl()
  const [loginData, setLoginData] = useState({})
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isActiveBtn, setIsActiveBtn] = useState(false)

  const { email, password } = loginData

  useEffect(() => {
    const isActive = loginData.email && loginData.password

    setMessage('')
    setIsActiveBtn(!!isActive)
  }, [loginData])

  const loginHandler = async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.auth.login({ email, password })

      if (response?.data?.errors) {
        throw new Error(getValidationErrorMessage(response.data.errors))
      }

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data) {
        throw new Error(formatMessage(translations.common.somethingWentWrong))
      }

      logIn(data)
      navigate(page.home)
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
      loginHandler()
    }
  }

  return (
    <div className="p-login">
      <ThemeToggle className="guest-theme-toggle" />
      <div className="login-header">
        <div className="brand-wrapper">
          <Brand className="brand">M|7|R</Brand>
        </div>
        <div className="sign-up-wrapper">
          <NavLink className="sign-up" link={page.registration}>
            {formatMessage(translations.auth.signUp)}
          </NavLink>
        </div>
      </div>

      <div className="login-content">
        <div className="login-panel" onKeyDown={submitKeyDownHandler} role="presentation">
          <div className="logo-wrapper">
            <Logo className="logo" />
          </div>

          <div className="title">{formatMessage(translations.auth.login.title)}</div>

          <div className="client-message">
            {message || formatMessage(translations.auth.login.description)}
          </div>

          <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="inputs-wrapper">
              <FormInput
                className="email-input"
                type="email"
                placeholder={formatMessage(translations.common.email)}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                value={email}
                pattern=".+@.+\..+"
                required
              />
              <FormInput
                className="password-input"
                type="password"
                placeholder={formatMessage(translations.common.password)}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                value={password}
                required
              />
            </div>

            <div className="reset-password">
              <Link to={page.initResetPassword} className="reset-password-link">
                {formatMessage(translations.auth.forgotPassword)}
              </Link>
            </div>

            <div className="button-wrapper">
              <FormButton
                className="submit-button"
                isActive={isActiveBtn}
                isLoading={isLoading}
                onClick={loginHandler}
              >
                {formatMessage(translations.auth.signIn)}
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
