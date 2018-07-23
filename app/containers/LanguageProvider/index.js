/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { withRouter } from "react-router-dom";

import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        //Valencian is a special case that for political reasons to be differentiated from Catalan.
        let locale = this.props.locale;
        if (this.props.locale === 'vl') {
            locale = 'ca';
        }
        return (
            <IntlProvider locale={locale} key={locale} messages={this.props.messages[this.props.locale]}>
                {React.Children.only(this.props.children)}
            </IntlProvider>
        );
    }
}

LanguageProvider.propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired
};

const mapStateToProps = createSelector(
    makeSelectLocale(),
    (locale) => ({ locale })
);

export default connect(mapStateToProps)(LanguageProvider);
