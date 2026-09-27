import moment from "moment"
import { intlFormatDate, intlFormatMessage, shortDateFormat, translations } from '../../i18n'

function formatLastOnlineAt(lastOnlineAt) {
  if (!lastOnlineAt) {
    return null
  }
  const date = moment(lastOnlineAt)

  const formattedDate = date.isSame(moment(), 'day')
    ? intlFormatMessage(translations.common.seenToday, { time: date.format('HH:mm') })
    : intlFormatMessage(translations.common.seenOn, {
        date: intlFormatDate(lastOnlineAt, shortDateFormat)
      })

  return formattedDate
}

export default formatLastOnlineAt
