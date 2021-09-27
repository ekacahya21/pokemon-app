import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from '../../utils/constants';
import idLocaleData from '../../i18n/id';
import enLocaleData from '../../i18n/en';

const messages = {
  id: { ...idLocaleData },
  en: { ...enLocaleData },
};

const propTypes = {
  locale: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const LanguageProvider = ({ locale, children }) => {
  return (
    <IntlProvider key={locale} locale={locale} messages={messages[DEFAULT_LOCALE]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = propTypes;

LanguageProvider.defaultProps = {
  locale: 'id',
};

export default memo(LanguageProvider);
