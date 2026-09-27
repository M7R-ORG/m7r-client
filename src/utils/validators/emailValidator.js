import { intlFormatMessage, translations } from '../../i18n'

const emailMaxLength = 100
const emailMinLength = 5

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function emailValidator(email) {
  const isValidMaxLength = email.length <= emailMaxLength
  const isValidMinLength = email.length >= emailMinLength

  const isValidPattern = regex.test(email)

  const errors = []

  if (!isValidMaxLength) {
    errors.push(
      intlFormatMessage(translations.auth.validation.emailMaxLength, { count: emailMaxLength })
    )
  }

  if (!isValidMinLength) {
    errors.push(
      intlFormatMessage(translations.auth.validation.emailMinLength, { count: emailMinLength })
    )
  }

  if (!isValidPattern) {
    errors.push(intlFormatMessage(translations.auth.validation.emailPattern))
  }

  const valid = isValidMaxLength && isValidMinLength && isValidPattern

  return {
    valid,
    error: errors.join('\n')
  }
}

export default emailValidator
