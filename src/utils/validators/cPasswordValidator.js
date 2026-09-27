import { intlFormatMessage, translations } from '../../i18n'

const passwordMaxLength = 40
const passwordMinLength = 8

function cPasswordValidator(password, cPassword) {
  const isValidMaxLength = cPassword.length <= passwordMaxLength
  const isValidMinLength = cPassword.length >= passwordMinLength
  const isMatchPasswords = cPassword === password

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

  if (!isMatchPasswords) {
    errors.push(intlFormatMessage(translations.auth.validation.passwordMismatch))
  }

  const valid = isValidMaxLength && isValidMinLength && isMatchPasswords

  return {
    valid,
    error: errors.join('\n')
  }
}

export default cPasswordValidator
