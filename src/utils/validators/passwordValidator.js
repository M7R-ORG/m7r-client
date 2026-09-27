import { intlFormatMessage, translations } from '../../i18n'

const passwordMaxLength = 40
const passwordMinLength = 8

function passwordValidator(password) {
  const isValidMaxLength = password.length <= passwordMaxLength
  const isValidMinLength = password.length >= passwordMinLength

  const errors = []

  if (!isValidMaxLength) {
    errors.push(
      intlFormatMessage(translations.auth.validation.passwordMaxLength, {
        count: passwordMaxLength
      })
    )
  }

  if (!isValidMinLength) {
    errors.push(
      intlFormatMessage(translations.auth.validation.passwordMinLength, {
        count: passwordMinLength
      })
    )
  }

  const valid = isValidMaxLength && isValidMinLength

  return {
    valid,
    error: errors.join('\n')
  }
}

export default passwordValidator
