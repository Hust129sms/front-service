import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { translate, changeLocale as changeLocaleAction, ViewTitle } from 'admin-on-rest';

import { changeTheme as changeThemeAction } from './actions';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({ theme, locale, changeTheme, changeLocale, translate }) => (
    <Card>
        <ViewTitle title={translate('pos.configuration')} />
        <CardText>
            <div style={styles.label}>{translate('pos.theme.name')}</div>
            <RaisedButton style={styles.button} label={translate('pos.theme.light')} primary onClick={() => changeTheme('light')} />
            <RaisedButton style={styles.button} label={translate('pos.theme.dark')} secondary onClick={() => changeTheme('dark')} />
        </CardText>
        <CardText>
            <div style={styles.label}>{translate('pos.language')}</div>
            <RaisedButton style={styles.button} label="中文" primary={locale === 'ch'} onClick={() => changeLocale('ch')} />
            <RaisedButton style={styles.button} label="en" primary={locale === 'en'} onClick={() => changeLocale('en')} />
        </CardText>
    </Card>
);

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.locale,
});

export default connect(mapStateToProps, {
    changeLocale: changeLocaleAction,
    changeTheme: changeThemeAction,
})(translate(Configuration));
