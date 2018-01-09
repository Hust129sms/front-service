import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { AppBarMobile, GET_LIST, GET_MANY, GET_ONE, GET } from 'admin-on-rest';
import Checkbox from 'material-ui/Checkbox';


import EditButton from "../buttons/EditButton";

import { Card, CardTitle, FlatButton, Divider, TextField, Dialog, CircularProgress } from 'material-ui';
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
    state = {
        email_open: false,
        tel_open: false,
        step: 0,
        submit_state: "提交",
        code: '',
        error_text: '',
    };

    componentDidMount() {
        restClient(GET_ONE, 'user', { id: '' })
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
                (data) => { this.setState({ ...data }); },
            );
    }

    checkEmail(){
        if (!this.state.email_c) {
            restClient(GET_ONE, 'check_email', { id: 'check_email' })
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
                    this.setState({ email_open: true })
                );
        }
    }
    checkTel(){
        if (!this.state.telephone_c) {
            this.setState({ tel_open: true, submit_state: '提交', error_text: '' });
        }
    }
    handleOpen = () => {
        this.setState({ email_open: true });
    };

    handleClose = () => {
        this.setState({ email_open: false });
    };
    handleClose_tel = () => {
        this.setState({ tel_open: false });
    };
    handleSubmit_tel = () => {
        if (this.state.submit_state === '提交'){
            this.setState({ submit_state: '' });
            restClient(GET_ONE, 'confirm_sms', { id: this.state.code })
                .then((response) => {
                    if (response.status < 200 || response.status >= 300) {
                        this.setState({ error_text: '无效的验证码', submit_state: '提交' });
                        throw new Error(response.statusText);
                    }
                    return response.data;
                }, (err) => {
                    if (err.status === 403) {
                        window.location = '#/login';
                    }
                },).then(
                    (data) => {
                        this.setState({ telephone_c: true, submit_state: '完成' , code: '绑定手机成功', error_text: '' });
                    },
                    () => {this.setState({ error_text: '无效的验证码', submit_state: '提交' }); }
                )
        }
        else if (this.state.submit_state === '完成') {
            this.setState({
                tel_open: false,
            });
        }
    };
    handleChange = (event) => {
        this.setState({
            code: event.target.value,
            error_text: '',
        });
    };
    sendSMS = () =>{
        restClient(GET_ONE, 'send_sms', { id: 'send_sms' })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            }, (err) => {
                if (err.status === 403) {
                    window.location = '#/login';
                }
            },).then(
            (data) => {
                this.setState({ step: 60,
                    tel_interval: setInterval(() => {
                        this.setState({ step: this.state.step - 1 });
                        if (this.state.step <=0){
                            clearInterval(this.state.tel_interval);
                        }
                    }, 1000) });
            },
            (data) => {
                if (data.msg === 'please wait') {
                    this.setState({ step: 60 - data.time,
                        tel_interval: setInterval(() => {
                            this.setState({ step: this.state.step - 1 });
                            if (this.state.step <=0 ){
                                clearInterval(this.state.tel_interval);
                            }
                        }, 1000) });
                }
            },
        );
    };
    render() {
        const {
            balance,
        } = this.state;

        const actions = [
            <FlatButton
                label="确定"
                primary="true"
                onClick={this.handleClose}
            />,
        ];
        const tel_actions =[
            <FlatButton
                label="取消"
                secondary="true"
                onClick={this.handleClose_tel}
            />,
            <FlatButton
                label={this.state.submit_state}
                primary="true"
                onClick={this.handleSubmit_tel}
            >
                {this.state.submit_state ? '' : <CircularProgress size={20} thickness={4} style={{ verticalAlign: 'top', marginTop: '10' }}/>}
            </FlatButton>,
        ];
        const { width } = this.props;
        return (
            <div>
                {width === 1 && <AppBarMobile title="用户" />}
                <Card>
                    <CardTitle title="信息维护" />
                    <EditButton basePath="user" record={{ id: this.state.username }} />
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
                                label="邮箱认证"
                                checked={this.state.email_c}
                                style={styles.checkbox}
                                onCheck={this.checkEmail.bind(this)}
                            /><br />
                            <Dialog
                                title="验证邮件已发送"
                                actions={actions}
                                modal={false}
                                open={this.state.email_open}
                                onRequestClose={this.handleClose}
                            >
                                验证邮件已经发送至你的邮箱{this.state.email}，半小时内有效，请注意查收。<br />如果长时间未收到邮件，请注意检查垃圾箱或重新获取邮件。
                            </Dialog>
                            <TextField
                                value={this.state.telephone}
                                floatingLabelText="联系电话"
                                floatingLabelFixed={true}
                                style={{display: 'inline-block'}}
                                underlineShow = {false}
                            />
                            <Checkbox
                                label="手机认证"
                                checked={this.state.telephone_c}
                                style={styles.checkbox}
                                onCheck={this.checkTel.bind(this)}
                            /><br/>
                            <Dialog
                                title="手机认证"
                                actions={tel_actions}
                                modal={true}
                                open={this.state.tel_open}
                                onRequestClose={this.handleClose_tel}
                            >
                                即将将验证短信发送至您的手机{this.state.telephone}　<br />
                                <div>
                                    <TextField hintText="手机验证码" floatingLabelFixed={false} value={this.state.code} onChange={this.handleChange} errorText={this.state.error_text} />
                                    <FlatButton label={ this.state.step ? ( "获取验证码(" + this.state.step + ")" ) : '获取验证码' }
                                        onClick={this.sendSMS}
                                        disabled={ !!this.state.step }
                                        style={{ verticalAlign: 'top' , marginTop: '5' }}
                                    />
                                </div>
                            </Dialog>
                            <TextField
                                value={this.state.qq || '未输入'}
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
                                value={this.state.name || '未输入'}
                                floatingLabelText="姓名"
                                floatingLabelFixed="true"
                                underlineShow={false}
                            />
                            <div>
                                <TextField
                                    value={this.state.school || '未输入'}
                                    floatingLabelText="学校"
                                    floatingLabelFixed="true"
                                    underlineShow={false}
                                />
                                <TextField
                                    value={this.state.student_no || '未输入'}
                                    floatingLabelText="学号"
                                    floatingLabelFixed="true"
                                    style={{ display: 'inline-block' }}
                                    underlineShow={false}
                                />
                                <Checkbox
                                    label="学生身份已认证"
                                    checked={this.state.telephone_c}
                                    style={styles.checkbox}
                                /><br />
                            </div>
                            <TextField
                                value={this.state.id_card || '未输入'}
                                floatingLabelText="身份证号"
                                floatingLabelFixed="true"
                                style={{display: 'inline-block'}}
                                underlineShow={false}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}


export default withWidth()(user);