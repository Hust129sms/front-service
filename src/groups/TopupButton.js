import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import { translate } from 'admin-on-rest';
import compose from 'recompose/compose';
import { reviewApprove as reviewApproveAction } from './reviewActions';

class TopupButton extends Component {
    handleTopup = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove(record.id, record);
    }

    render() {
        const { record, translate } = this.props;
        return record ? <FlatButton
            primary
            label={translate('resources.reviews.action.accept')}
            onClick={this.handleTopup}
            icon={<AccountBalanceWallet color="#4CAF50" />}
        /> : <span />;
    }
}

TopupButton.propTypes = {
    record: PropTypes.object,
    reviewApprove: PropTypes.func,
    translate: PropTypes.func,
};

const enhance = compose(
    translate,
    connect(null, {
        reviewApprove: reviewTopupAction,
    })
);

export default enhance(TopupButton);

export const reviewApprove = (id, data, basePath) => ({
    type: REVIEW_APPROVE,
    payload: { id, data: { ...data, status: 'accepted' }, basePath },
    meta: { resource: 'reviews', fetch: UPDATE, cancelPrevious: false },
});
