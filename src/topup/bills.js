import React, {Component} from 'react';
import { GridList as MuiGridList, GridTile } from 'material-ui/GridList';
import { NumberField, EditButton, List, Datagrid, TextField } from 'admin-on-rest';
import { black } from 'material-ui/styles/colors';
import { FlatButton } from 'material-ui';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

const styles = {
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
};

export const BillList = (props) => (
    <List {...props} title="resources.bills.name">
        <Datagrid>
            <TextField source="id" style={{ width: '15%' }} sortable={false} />
            <TextField source="amount" style={{ width: '15%' }} sortable={false} />
            <TextField source="time" style={{ textAlign: 'left', width: '25%' }} sortable={false} />
            <TextField source="type" style={{ width: '20%', color: black }} sortable={false} />
            <TextField source="status" style={{ width: '15%', color: black }} sortable={false} />
            <Charge />
        </Datagrid>
    </List>
);

export default BillList;

class Charge extends Component {
    render() {
        return (
            <div>
            { this.props.record.status === '待支付⌛️' ? <FlatButton label="支付" icon={<NavigationArrowForward size={10} />} href={`https://www.fiiyu.com/pay/${this.props.record.id}`} labelPosition="before" /> : <span />}
            </div>
        );
    }
}
