import { intlFormatMessage, translations } from '../../i18n'

const nameMaxLength = 40
const nameMinLength = 4
const regex = /^[a-zA-Z0-9_.-<>~ ]+$/

function channelNameValidator(name) {
  const isValidMaxLength = name.length <= nameMaxLength
  const isValidMinLength = name.length >= nameMinLength
  const isValidPattern = regex.test(name)

  if (!isValidMaxLength) {
    throw new Error(
      intlFormatMessage(translations.auth.validation.channelNameMaxLength, { count: nameMaxLength })
    )
  }

  if (!isValidMinLength) {
    throw new Error(
      intlFormatMessage(translations.auth.validation.channelNameMinLength, { count: nameMinLength })
    )
  }

  if (!isValidPattern) {
    throw new Error(intlFormatMessage(translations.auth.validation.channelNamePattern))
  }
}

export default channelNameValidator
