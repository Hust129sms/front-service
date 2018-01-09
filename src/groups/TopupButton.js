import React, {Component} from 'react';
import { RaisedButton, TextField, CircularProgress, Snackbar } from 'material-ui';
import restClient from '../restClient';
import { GET_ONE } from 'admin-on-rest';
import { green500, red500, white } from 'material-ui/styles/colors';
import AssignmentReturned from 'material-ui/svg-icons/action/assignment-returned'
const snackBar_style = {
    success:{
        backgroundColor: green500,
    },
    error:{
        backgroundColor: red500,
    },
};

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props, open: false };
    }

    state = {
        balance: 0,
        group_name: '',
        group_balance: '',
        charge: '',
        group_id: '',
        error: 0,
    };
    componentDidMount() {
        restClient(GET_ONE, 'balance', { id: 'balance' })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            }, (err) => {
                if (err.status === 403) {
                    window.location = '#/login';
                }
            },)
            .then(
                ({ balance }) => { this.setState({ balance: `${balance}元` }); },
            );
    }
    onChangeHandle = (event) => {
        event.target.value = parseInt(event.target.value, 10);
        if(event.target.value === 'NaN'){
            event.target.value = '';
        }
        this.setState({
            charge: event.target.value,
            txtfield: event.target,
        });
    };
    handleClick(){
        if (this.state.charge === 0 || this.state.charge === '' || !this.state.charge) {
            this.setState({ open: true, message: '请输入圈存金额', error: 1 });
            return 0;
        }
        restClient(GET_ONE, 'charge_group', { id: `${this.state.group_id}-${this.state.charge}`  })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            }, (err) => {
                if (err.status === 403) {
                    window.location = '#/login';
                }
            },)
            .then(
                () => {
                    this.setState({ open: true,
                        message: `成功转入${this.state.charge}元`,
                        balance: `${parseFloat(this.state.balance) - this.state.charge}元`,
                        charge: 0,
                        group_balance: `${parseFloat(this.state.group_balance) + parseFloat(this.state.charge)}元`,
                        error: 0 });
                    this.state.txtfield.value = '';
                },
                (data) => { this.setState({ open: true, message: `错误！余额不足！` , error: 1 });
                },
            );
    }
    handleRequestClose = () => {
        this.setState({ open: false });
    }
    render() {
        return (
            <div>
                <h2>你可以将余额从你的账户转入圈子中以供圈子进行消费。</h2><h3>注意，转入后不可转出，如有疑问请联系客服。</h3>
                主账户余额：
                {this.state.balance ? '' : <CircularProgress size={20} />} <TextField value={this.state.balance} floatingLabelText={''} underlineShow={false} /><br />
                圈子名称：
                <TextField value={this.state.group_name} floatingLabelText={''} underlineShow={false} /><br />
                圈子余额：
                <TextField value={this.state.group_balance} floatingLabelText={''} underlineShow={false} /><br />
                充值金额：
                <TextField id="1" floatingLabelText="" onChange={this.onChangeHandle} value={this.charge} /> <br />
                <RaisedButton label={'转入'} onClick={this.handleClick.bind(this)} style={{ marginLeft: '20%' }} primary={true} icon={<AssignmentReturned color={white} />} />
                <Snackbar open={this.state.open} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleRequestClose} bodyStyle={this.state.error? snackBar_style.error :snackBar_style.success} />
            </div>) ;
    }
}


export default PopUp;
