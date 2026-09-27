import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FormDesc, FormInput, FormTitle } from '../../../_exports'
import { loginValidator } from '../../../../utils/validators/_exports'
import { translations } from '../../../../i18n'
import './Step2.scss'

function Step2({
  className = '',
  setRegistrationData = null,
  registrationData = null,
  setIsValid = () => {}
}) {
  const { formatMessage } = useIntl()
  const [isValidLogin, setIsValidLogin] = useState(false)

  const { login } = registrationData

  useEffect(() => {
    setIsValid(isValidLogin)
  }, [isValidLogin, setIsValid])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="login-title">
        {formatMessage(translations.auth.registration.login.title)}
      </FormTitle>

      <FormDesc className="login-desc">
        {formatMessage(translations.auth.registration.login.description)}
      </FormDesc>

      <div className="inputs">
        <FormInput
          className="login-input"
          type="login"
          placeholder={formatMessage(translations.common.login)}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              login: e.target.value
            })
          }
          value={login}
          validator={loginValidator}
          onValid={setIsValidLogin}
          required
        />
      </div>
    </div>
  )
}

Step2.propTypes = {
  setRegistrationData: PropTypes.func,
  registrationData: PropTypes.shape({
    email: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    birthday: PropTypes.string
  }),
  className: PropTypes.string,
  setIsValid: PropTypes.func
}

export default Step2
