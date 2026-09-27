import { useIntl } from 'react-intl'
import { translations } from '../../../i18n'
import './Error.scss'

function Error() {
  const { formatMessage } = useIntl()

  return <div>{formatMessage(translations.common.pages.error)}</div>
}

export default Error
