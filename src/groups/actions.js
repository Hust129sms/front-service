import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Divider } from 'material-ui';
import ActionList from 'material-ui/svg-icons/action/list'

const styles = {
    floating: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 60,
        left: 'auto',
        position: 'fixed',
    },
    flat: {
        overflow: 'inherit',
        borderLeft: '2px solid #dddddd',
    },
};

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const hrstyle = {
    border: '10px',
    box_sizing: 'border-box',
    display: 'inline-block',
    font_family: 'Roboto, sans-serif',
    cursor: 'pointer',
    margin: '0px 8px 0px 0px',
    padding: '0px',
    outline: 'none',
    font_size: 'inherit',
    font_weight: 'inherit',
    position: 'relative',
    vertical_align: 'middle',
    z_index: '1',
    height: '36px',
    line_height: '36px',
    min_width: '88px',
    color: 'rgb(0, 188, 212)',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    border_radius: '2px',
    user_select: 'none',
    overflow: 'hidden',
    background_color: 'rgba(0, 0, 0, 0)',
    text_align: 'center',
};

const Actions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, refresh }) => (
    <CardActions style={cardActionStyle}>
        <FlatButton primary label="充值记录" href="#/charge_group_history" icon={<ActionList />} style={{ marginRight: '15px'}} labelPosition='before' />

        <CreateButton basePath={basePath} />
        <FlatButton primary label="刷新" onClick={refresh} icon={<NavigationRefresh />} />
        {/* Add your custom actions */}

    </CardActions>
);

export default Actions;
const CreateButton = ({ basePath = '', translate, label = '创建', width }) =>
    width === 1
        ?
        <FloatingActionButton
            style={styles.floating}
            containerElement={<Link to={`${basePath}/create`} />}
        >
            <ContentAdd />
        </FloatingActionButton>
        :
        <FlatButton
            primary
            label={label}
            icon={<ContentAdd />}
            containerElement={<Link to={`${basePath}/create`} />}
            style={styles.flat}
        />;


CreateButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.number,
};