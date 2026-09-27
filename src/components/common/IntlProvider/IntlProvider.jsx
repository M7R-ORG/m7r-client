import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RawIntlProvider } from 'react-intl'
import { intls } from '../../../i18n'

function IntlProvider({ children = null }) {
  const locale = useSelector((state) => state.system.language)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <RawIntlProvider value={intls[locale]}>{children}</RawIntlProvider>
}

IntlProvider.propTypes = {
  children: PropTypes.node
}

export default IntlProvider
