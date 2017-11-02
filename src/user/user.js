import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { AppBarMobile, GET_LIST, GET_MANY, GET_ONE} from 'admin-on-rest';
import Checkbox from 'material-ui/Checkbox';


import EditButton from "../buttons/EditButton";

import { Card, CardTitle, FlatButton, Divider, TextField } from 'material-ui';
import { Link } from 'react-router-dom';


import restClient from '../restClient';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginRight: 16,
        display: 'inline-block'
    },

};

class user extends Component {
    state = {};

    componentDidMount() {
        restClient(GET_ONE, 'user', { id: '1' })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            })
            .then(
                ({ email,email_c,last,telephone,qq,school,student,log_level,id_card,student_no,telephone_c,username }) => {this.setState({ email: email, email_confirm: email_c,last:last,telephone: telephone,id_card:id_card
                    ,log_level:log_level,qq:qq,school:school,student:student,student_no:student_no,telephone:telephone,telephone_c:telephone_c,username:username
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
                {width === 1 && <AppBarMobile title="用户" />}
                <Card>
                    <CardTitle title="用户信息" />
                    <EditButton basePath="user" />
                    <div style={{ marginLeft: '23' }}>
                        <div style={{ padding: '1', marginBottom: '10' }}>
                            <TextField
                                value={this.state.username}
                                floatingLabelText="用户名"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            /><br/>
                            <TextField
                                value={this.state.email}
                                floatingLabelText="用户邮箱"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            />
                            <Checkbox
                                label="邮箱已认证"
                                checked={this.state.email_confirm}
                                style={styles.checkbox}
                            /><br/>
                            <TextField
                                value={this.state.telephone}
                                floatingLabelText="联系电话"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            />
                            <Checkbox
                                label="手机已认证"
                                checked={this.state.telephone_c}
                                style={styles.checkbox}
                            /><br/>
                            <TextField
                                value={this.state.qq}
                                floatingLabelText="QQ"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            /><br/>
                        </div>
                    </div>
                            <Divider style={{marginLeft:'-23'}}/>
                    <CardTitle title="身份信息" />
                    <div style={{ marginLeft: '23' }}>
                        <div style={{ padding: '1', marginBottom: '10' }}>

                            <TextField
                                value={this.state.student_no}
                                floatingLabelText="学号"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            />
                            <Checkbox
                                label="学生身份已认证"
                                checked={this.state.telephone_c}
                                style={styles.checkbox}
                            /><br/>
                            <TextField
                                value={this.state.id_card}
                                floatingLabelText="身份证号"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}


export default withWidth()(user);