import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import { cyan500 } from 'material-ui/styles/colors';
import ActionAccountBalanceWallet  from 'material-ui/svg-icons/action/account-balance-wallet';
import { Dialog, FlatButton, TextField } from 'material-ui';
import PopUp from '../groups/TopupButton';

class TopUpButton extends Component{
    constructor(props) {
        super(props);
        this.state = { ...props, open: false };
    }

    handleClick = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="关闭"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div>
            <FlatButton
                onClick={this.handleClick.bind(this)}
                style={{ overflow: 'inherit' }}
                label="圈存"
                primary={true}
                icon={<ActionAccountBalanceWallet color={cyan500} />}
            />
            <Dialog
                title="圈存"
                actions={actions}
                modal={true}
                open={this.state.open}
                onRequestClose={this.handleClose} >
                <PopUp group_name={this.state.record.name} group_balance={this.state.record.balance} group_id={this.state.record.id} />


            </Dialog>
            </div>
        );
    }
}


export default TopUpButton;

