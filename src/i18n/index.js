import { createIntl } from 'react-intl'
import { language } from '../constants/system'
import { store } from '../redux/store'
import translations from './locales/en'
import ru from './locales/ru'

const intls = {
  [language.english]: createIntl({ locale: language.english }),
  [language.russian]: createIntl({ locale: language.russian, messages: ru })
}

const shortDateFormat = { day: 'numeric', month: 'short' }

function getCurrentIntl() {
  return intls[store.getState().system.language]
}

function intlFormatMessage(descriptor, values) {
  return getCurrentIntl().formatMessage(descriptor, values)
}

function intlFormatDate(date, options) {
  return getCurrentIntl().formatDate(date, options)
}

export { translations, intls, shortDateFormat, intlFormatMessage, intlFormatDate }
