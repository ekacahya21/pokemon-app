import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { useInjectSaga } from 'Utils/injectSaga';
import { loadTranslation } from './actions';
import saga from './saga';

const propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired,
};

const key = 'language';

const LanguageProvider = ({ locale, messages, children }) => {
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTranslation());
  }, []);

  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = propTypes;

const mapStateToProps = (state) => ({
  locale: state.language.locale,
  messages: state.language.messages,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(LanguageProvider);
