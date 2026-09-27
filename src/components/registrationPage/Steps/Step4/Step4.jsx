import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { DateInput, FormDesc, FormTitle } from '../../../_exports'
import { translations } from '../../../../i18n'
import './Step4.scss'

function Step4({
  className = '',
  setRegistrationData = null,
  registrationData = null,
  setIsValid = () => {}
}) {
  const { formatMessage } = useIntl()
  const [value, setValue] = useState(null)

  const { birthday } = registrationData

  useEffect(() => {
    if (value !== birthday) {
      setRegistrationData({
        ...registrationData,
        birthday: value
      })
    }
  }, [value, setRegistrationData, registrationData, birthday])

  return (
    <div className={`c-registration-step ${className}`}>
      <FormTitle className="birthday-title">
        {formatMessage(translations.auth.registration.birthday.title)}
      </FormTitle>

      <FormDesc className="birthday-desc">
        {formatMessage(translations.auth.registration.birthday.description)}
      </FormDesc>

      <div className="inputs">
        <DateInput
          className="birthday-input"
          setValue={setValue}
          value={birthday}
          onValid={setIsValid}
        />
      </div>
    </div>
  )
}

Step4.propTypes = {
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

export default Step4
