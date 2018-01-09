import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import CommunicationContacts from 'material-ui/svg-icons/communication/contacts';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import CommunicationChat  from 'material-ui/svg-icons/communication/chat'
import LabelIcon from 'material-ui/svg-icons/action/label';
import { translate, DashboardMenuItem } from 'admin-on-rest';
import { Divider } from 'material-ui';

import { VisitorIcon } from './visitors';
import { CommandIcon } from './commands';
import { ProductIcon } from './products';
import { CategoryIcon } from './categories';
import { ReviewIcon } from './reviews';
import { GroupIcon } from './groups';

const items = [
    { name: 'user', icon: <VisitorIcon /> },
    { name: 'divider', title: '信息管理' },
    { name: 'groups', icon: <GroupIcon />},
    { name: 'members', icon: <CommunicationContacts />},
    { name: 'templates', icon: <ProductIcon />},
    { name: 'divider', title: '发通知' },
    { name: 'send', icon: <CommunicationEmail /> },
    { name: 'collect', icon: <CommunicationChat /> },
    /*
    { name: 'segments', icon: <LabelIcon /> },
    { name: 'commands', icon: <CommandIcon /> },
    { name: 'products', icon: <ProductIcon /> },
    { name: 'categories', icon: <CategoryIcon /> },
    { name: 'reviews', icon: <ReviewIcon /> },*/
];

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const Menu = ({ onMenuTap, translate, logout }) => (
    <div style={styles.main}>
        <div>
            <span style={{ marginLeft: '15px', color: '#BDBDBD', marginTop: '15px' }} >账户</span>
            <Divider style={{ marginTop: '5px', marginBottom: '5px', paddingTop: '2px' }} />
        </div>
        <DashboardMenuItem onTouchTap={onMenuTap} />
        {items.map(item => (
            <div>
            {item.name === 'divider'?
                <div>
                    <span style={{ marginLeft: '15px', color: '#BDBDBD', marginTop: '15px' }} >{item.title}</span>
                    <Divider style={{ marginTop: '5px', marginBottom: '5px', paddingTop: '2px' }} />
                </div>
                :
            <MenuItem
                key={item.name}
                containerElement={<Link to={`/${item.name}`} />}
                primaryText={translate(`resources.${item.name}.name`, { smart_count: 2 })}
                leftIcon={item.icon}
                onTouchTap={onMenuTap}
            />}
            </div>
        ))}
        <Divider style={{ marginTop: '16px', marginBottom: '16px', paddingTop: '2px' }} />
        <MenuItem
            containerElement={<Link to="/configuration" />}
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onTouchTap={onMenuTap}
        />
        {logout}
    </div>
);

const enhance = compose(
    connect(state => ({
        theme: state.theme,
        locale: state.locale,
    })),
    translate,
);

export default enhance(Menu);
