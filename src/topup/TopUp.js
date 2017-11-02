import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { AppBarMobile, GET_LIST, GET_MANY, GET_ONE} from 'admin-on-rest';
import { Card, CardTitle, FlatButton, TextField, Divider } from 'material-ui';
import { Link } from 'react-router-dom';

import restClient from '../restClient';


class TopUp extends Component {
    state = {};

    componentDidMount() {
        restClient(GET_ONE, 'balance', { id: '1' })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            })
            .then(
                ({ balance }) => {this.setState({ balance: balance+'元'
                })}
            );
    }

    render() {
        const {
            balance,
        } = this.state;
        const { width } = this.props;
        return (
            <div>
                {width === 1 && <AppBarMobile title="充值" />}
                <Card>
                    <CardTitle title="充值" />
                    <div style={{ marginLeft: '23' }}>
                        <div style={{ padding: '1', marginBottom: '10' }}>当前余额：
                            <FlatButton style={{ padding: '1', marginLeft: '10' }} label={this.state.balance} /></div>
                        <div>
                            <Divider/>
                            <div style={{ marginTop: '25' }}>
                                请选择充值金额：
                            </div>
                            <div>
                                <FlatButton label="10元" containerElement={ <Link to='topup/10' /> } />
                                <FlatButton label="20元" containerElement={ <Link to='topup/20' /> } />
                                <FlatButton label="30元" containerElement={ <Link to='topup/30' /> } />
                            </div>
                            <div>
                                <FlatButton label="50元" containerElement={ <Link to='topup/50' /> } />
                                <FlatButton label="100元" containerElement={ <Link to='topup/100' /> } />
                                <FlatButton label="200元" containerElement={ <Link to='topup/200' /> } />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withWidth()(TopUp);