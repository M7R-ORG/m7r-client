import { intlFormatMessage, translations } from '../../i18n'

const loginMaxLength = 40
const loginMinLength = 4
const regex = /^[a-zA-Z0-9]+$/

function loginValidator(login) {
  const isValidMaxLength = login.length <= loginMaxLength
  const isValidMinLength = login.length >= loginMinLength
  const isValidPattern = regex.test(login)

  const errors = []

  if (!isValidMaxLength) {
    errors.push(
      intlFormatMessage(translations.auth.validation.loginMaxLength, { count: loginMaxLength })
    )
  }

  if (!isValidMinLength) {
    errors.push(
      intlFormatMessage(translations.auth.validation.loginMinLength, { count: loginMinLength })
    )
  }

  if (!isValidPattern) {
    errors.push(intlFormatMessage(translations.auth.validation.loginPattern))
  }

  const valid = isValidMaxLength && isValidMinLength && isValidPattern

  return {
    valid,
    error: errors.join('\n')
  }
}

export default loginValidator
