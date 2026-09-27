import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { FormDesc, FormInput, FormTitle } from '../../../_exports'
import { emailValidator } from '../../../../utils/validators/_exports'
import { translations } from '../../../../i18n'
import './Step1.scss'

function Step1({
  className = '',
  setRegistrationData = null,
  registrationData = null,
  setIsValid = () => {}
}) {
  const { formatMessage } = useIntl()
  const [isValidEmail, setIsValidEmail] = useState(false)

  const { email } = registrationData

  useEffect(() => {
    setIsValid(isValidEmail)
  }, [isValidEmail, setIsValid])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="email-title">
        {formatMessage(translations.auth.registration.email.title)}
      </FormTitle>

      <FormDesc className="email-desc">
        {formatMessage(translations.auth.registration.email.description)}
      </FormDesc>

      <div className="inputs">
        <FormInput
          className="email-input"
          type="email"
          placeholder={formatMessage(translations.common.email)}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              email: e.target.value
            })
          }
          value={email}
          pattern=".+@.+\..+"
          validator={emailValidator}
          onValid={setIsValidEmail}
          required
        />
      </div>
    </div>
  )
}

Step1.propTypes = {
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

export default Step1
