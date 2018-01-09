import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import DollarIcon from 'material-ui/svg-icons/editor/attach-money';
import { translate } from 'admin-on-rest';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';


const styles = {
    card: { borderLeft: 'solid 4px #31708f', flex: '1', marginRight: '1em' },
    icon: { float: 'left', width: '64px', height: '64px', padding: '16px', color: '#31708f' },
};

export default translate(({ value, translate }) => (
    <Card style={styles.card}>
        <div style={{ marginBottom: '10px' }}>
            <DollarIcon style={styles.icon} />
            <CardTitle subtitle={translate('pos.dashboard.monthly_revenue')} />
            <span style={{ marginLeft: '5px', paddingRight: '5px' }}>{ value }</span>
        </div>
        <div style={{ marginTop: '16px' ,paddingTop: '10px' }}>
            <FlatButton label={translate('pos.dashboard.top_up')} primary={true} style={{ width: '50%'}} containerElement={<Link to="topup"/>}/>
            <FlatButton label={translate('pos.dashboard.history')} primary={true} style={{ width: '50%', display: 'inline-block'}} containerElement={<Link to="bills"/>}/>
        </div>
    </Card>
));

