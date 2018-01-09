import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { AppBarMobile, GET_LIST, GET_MANY, GET_ONE} from 'admin-on-rest';
import { Card, CardTitle, FlatButton, TextField, Divider, Dialog, RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';

import restClient from '../restClient';

class TopUp extends Component {
    state = { open: false, amount: '' };

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
    handleClose() {
        this.setState({ open: false });
    }
    handleCharge(amount) {
        this.setState({ amount: amount, open: true });
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleChange(event) {
        event.target.value = parseInt(event.target.value);
        if (event.target.value === 'NaN') {
            event.target.value = '';
        }
        this.setState({ amount: event.target.value });
    }
    handleCommit(type) {
        restClient(GET_ONE, 'bills', { id: `${this.state.amount}-${type}` })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            }).then((data) => {
            console.log(data);
        });
    }

    render() {
        const {
            balance,
        } = this.state;
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onClick={this.handleClose.bind(this)}
            />,
        ];
        const { width } = this.props;
        return (
            <div>
                {width === 1 && <AppBarMobile title="充值" />}
                <Card>
                    <CardTitle title="充值" />
                    <div style={{ marginLeft: '23' }}>
                        <div style={{ padding: '1', marginBottom: '10' }}>当前余额：
                            <TextField style={{ padding: '1', marginLeft: '10' }} value={this.state.balance} underlineShow={false} /></div>
                        <RaisedButton label="充值记录" containerElement={<Link to="/bills" />} style={{ margin: '16px' }} />
                        <RaisedButton label="消费记录" containerElement={<Link to="/charge_group_history" />} style={{ margin: '16px' }} />
                        <div>
                            <Divider/>
                            <div style={{ marginTop: '25' }}>
                                请选择充值金额：
                            </div>
                            <div>
                                <FlatButton label="10元" onClick={this.handleCharge.bind(this, 10)} />
                                <FlatButton label="20元" onClick={this.handleCharge.bind(this, 20)} />
                                <FlatButton label="30元" onClick={this.handleCharge.bind(this, 30)} />
                            </div>
                            <div>
                                <FlatButton label="50元" onClick={this.handleCharge.bind(this, 50)} />
                                <FlatButton label="100元" onClick={this.handleCharge.bind(this, 100)} />
                                <FlatButton label="200元" onClick={this.handleCharge.bind(this, 200)} />
                            </div>
                            <div>
                                <TextField hintText="自定义金额" value={this.state.amount} onChange={this.handleChange.bind(this)} style={{ width: '150' , marginLeft: '25' }} />
                                <FlatButton label="确认" onClick={this.handleOpen.bind(this)} />
                            </div>
                        </div>
                    </div>
                </Card>
            <Dialog open={this.state.open} title="充值" actions={actions} modal={false} onRequestClose={this.handleClose.bind(this)} >
                <h2>{`您即将支付 ${this.state.amount} 元，款项将直接进入账户余额，请选择充值渠道`}</h2>
                <RaisedButton primary={true} label="支付宝" style={{ margin: 16 }} onClick={this.handleCommit.bind(this, 0)} />
                <RaisedButton backgroundColor="#43A047" labelColor="#ffffff" label="微信" style={{ margin: 16 }} onClick={this.handleCommit.bind(this, 1)} />
                <RaisedButton secondary={true} label="网银" style={{ margin: 16 }} onClick={this.handleCommit.bind(this, 2)} />
                <RaisedButton primary={true} label="人工" style={{ margin: 16 }} onClick={this.handleCommit.bind(this, 3)} />
            </Dialog>
            </div>
        );
    }
}

export default withWidth()(TopUp);