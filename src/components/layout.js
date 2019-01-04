import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'

// Locale data
import enData from 'react-intl/locale-data/en'
import nlData from 'react-intl/locale-data/nl'

// Messages
import en from '../i18n/en-US.json'
import nl from '../i18n/nl.json'

export const messages = { 'en-US': en, nl }

addLocaleData([...enData, ...nlData])

const Layout = ({ locale, children }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <Container>
      {/* <Navigation /> */}
      {children}
    </Container>
  </IntlProvider>
)

export default Layout