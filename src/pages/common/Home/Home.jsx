import { useIntl } from 'react-intl'
import { translations } from '../../../i18n'
import './Home.scss'

function Home() {
  const { formatMessage } = useIntl()

  return <div className="p-home">{formatMessage(translations.common.pages.home)}</div>
}

export default Home
