import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FormDesc, FormInput, FormTitle } from '../../../_exports'
import { passwordValidator, cPasswordValidator } from '../../../../utils/validators/_exports'
import { translations } from '../../../../i18n'
import './Step3.scss'

function Step3({
  className = '',
  setRegistrationData = null,
  registrationData = null,
  setIsValid = () => {}
}) {
  const { formatMessage } = useIntl()
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [isValidCPassword, setIsValidCPassword] = useState(false)

  const { password, confirmationPassword } = registrationData

  useEffect(() => {
    setIsValid(isValidPassword && isValidCPassword)
  }, [isValidPassword, isValidCPassword, setIsValid])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="password-title">
        {formatMessage(translations.auth.registration.password.title)}
      </FormTitle>

      <FormDesc className="password-desc">
        {formatMessage(translations.auth.registration.password.description)}
      </FormDesc>

      <div className="inputs">
        <FormInput
          className="password-input"
          type="password"
          placeholder={formatMessage(translations.common.password)}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value
            })
          }
          value={password}
          validator={passwordValidator}
          onValid={setIsValidPassword}
          isPassword
          required
        />

        <FormInput
          className="confirmation-password-input"
          type="password"
          placeholder={formatMessage(translations.auth.registration.password.confirmation)}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              confirmationPassword: e.target.value
            })
          }
          value={confirmationPassword}
          validator={(cPassword) => cPasswordValidator(password, cPassword)}
          onValid={setIsValidCPassword}
          required
        />
      </div>
    </div>
  )
}

Step3.propTypes = {
  setRegistrationData: PropTypes.func,
  registrationData: PropTypes.shape({
    email: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    confirmationPassword: PropTypes.string,
    birthday: PropTypes.string
  }),
  className: PropTypes.string,
  setIsValid: PropTypes.func
}

export default Step3
