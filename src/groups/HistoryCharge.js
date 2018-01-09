import React from 'react';
import { GridList as MuiGridList, GridTile } from 'material-ui/GridList';
import { NumberField, EditButton, List, Datagrid, TextField } from 'admin-on-rest';
import { black } from 'material-ui/styles/colors'

const styles = {
    root: {
        margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
};

export const HistoryChargeList = (props) => (
    <List {...props} title="resources.charge_group_history.charge_record">
        <Datagrid>
            <TextField source="id" style={{ width: '10%' }} sortable={false} />
            <TextField source="in_group" style={{ width: '30%', color: black }} sortable={false} />
            <TextField source="amount" style={{ width: '15%' }} sortable={false} />
            <TextField source="time" style={{ textAlign: 'left', width: '25%' }} sortable={false} />
        </Datagrid>
    </List>
);

export default HistoryChargeList;
