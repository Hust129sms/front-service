import React,{ Component }  from 'react';
import HotTable from 'react-handsontable';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import style from 'react-file-upload/css/upload.less';
import {
    translate,
    BooleanField,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Delete,
    Edit,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    NumberInput,
    ReferenceInput,
    RichTextInput,
    SelectInput,
    TabbedForm,
    TextInput,
    ViewTitle,
    FileInput,
    FileField,
    AutocompleteInput,
    ImageField,
    CheckboxGroupInput,
    DisabledInput,
    GET_LIST,
    DELETE,
    GET_ONE,
    UPDATE
} from 'admin-on-rest';
import { Paper, Drawer, RaisedButton, Divider, Dialog, FlatButton, Snackbar } from 'material-ui';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import CommunicationContacts from 'material-ui/svg-icons/communication/contacts';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import restClient from '../restClient';

class MemberList extends Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.handsontableData = [
            [1, '张三', '130****0000', '沁苑', '会长'],
        ];
    }
    state={
        open: false,
        index: [],
        last: [],
        dia_open: false,
        datas: [],
        deleted: false,
        snack: false,
        tips: '',
        groups: 0,
        upload: false,
        stepIndex: 0,
        loading: false,
        fileUploaded: false,
        group_list: [],
        group_list_loaded: false,
        tel_open: false,
        member_loaded: false,
        submit_state: '提交',
        tel_confirm_code: '',
        save_success: false,
        submit_save: false,
        server_file: '',
        change: true,
    };
    componentWillMount(){
        restClient(GET_LIST, 'groups', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'ASC' },
            filter: {},
        }).then(
            (response) => {
                this.setState({ group_list: response.data});
            }, (err) => {
                if (err.status === 403) {
                    window.location = '#/login';
                }
            },
        ).then(
            () => {
                this.setState({ group_list_loaded: true });
            }
        );
    }
    componentDidMount(){
        this.count = 0;
    }

    componentWillUnmount(){
        this.setState({change: true});
        if (this.state.groups && this.state.change && window.confirm('要保存修改嘛？')) {
            this.handleSave();
        }
    }
    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };
    handleUpload(files) {
        if (files[0] !== undefined) {
            if (files[0].name.split('.')[files[0].name.split('.').length - 1] !== 'xls' && files[0].name.split('.')[files[0].name.split('.').length - 1] !== 'xlsx') { return; }
            let upload = request.post('http://127.0.0.1:5000/uploads/xls').field('file', files[0]).set('Accept', 'application/json');
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: 1,
            }));
            this.setState({ stepIndex: 1 });
            upload.end(
                (err, response) => {
                    this.setState({ server_file: response.body.file });
                    restClient(GET_ONE, 'members/set_file', { id: this.state.server_file }).then(
                        (response) => {
                            this.setState({ tips: `您一共上传了 ${response.data.record} 条数据，点击确定会覆盖原数据。`, fileUploaded: true });
                        }
                    );
                },
            );
        }
    }
    sendSMS = () =>{
        restClient(GET_ONE, 'send_sms', { id: `unlock_group-${this.state.groups}` })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            }).then(
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
            }
        )
    };
    content = [];
    handleRowClick(index){
        // console.log(index);
        if (index === 'all') {this.setState({ open: true, index: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], last: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24] }); return;}
        if (index === 'none') {this.setState({ open: false, index: [], last: [] }); return;}
        if (index.length !== 0 && this.state.last.length !== '全部') {
            this.setState({ open: true, index: index });
        }
        // 结束过程
        else this.setState({ open:false, index:[], last: this.state.index });
    }
    handleCloseSnack = () => this.setState({ save_success:false});
    handleChange = (event, index, value) => {
        this.setState({ groups: value, member_loaded: false, submit_save: false });
        if (value === 0) return;
        restClient(GET_ONE, 'members' , { id: value }).then(
            (response) => {
                this.handsontableData = response.data;
                this.setState({ member_loaded: true, change: true });
            },
            (response) =>{
                if (response.status === 401) {
                    this.setState({ tel_open: true });
                }
            },
        );
    };

    handleOnUpload() {
        this.setState({ upload: true });
    }
    handleOnDownload(){
        console.log(this.handsontableData);
    }
    handleClose(){
        this.setState({ upload: false, stepIndex: 0 });
        this.handleChange(0,0,this.state.groups);
    }
    renderContent(){
        switch (this.state.stepIndex){
        case 0:
            return (
                <Dropzone multiple={false} onDrop={this.handleUpload.bind(this)} style={{ border: 0 }}>
                    <RaisedButton label={'点此上传'} primary={true} style={{ marginLeft: '45%', width: '10%' }} />
                </Dropzone>
            );
        case 1:
            return (
                <div>
                    {this.state.fileUploaded ? <div style={{ textAlign: 'center' }}>{this.state.tips}</div> : <div> <LinearProgress mode="indeterminate" /> 请稍后，服务器正在解析数据 </div> }
                    <br />
                    <FlatButton label={'后退'} onClick={() => {this.dummyAsync(() => this.setState({ loading: false, stepIndex: 0 })); }} style={{ margin: '10', marginLeft: `${this.state.fileUploaded ? '45' : '35'}%`, width: '10%' }} />
                     { this.state.fileUploaded ? <FlatButton
                         label={'确定'}
                         onClick={() => {
                            restClient(GET_ONE, `members/file_confirm/${this.state.server_file}`, { id: this.state.groups })
                                .then(
                                () => {
                                    this.dummyAsync(() => this.setState({ loading: false, stepIndex: 2 }));
                                    this.setState({ save_success: true });
                                },
                            );
                         }} /> : '' }
                </div>
            );
        case 2:
        }
    }
    handleClose_tel = () => {
        this.setState({ tel_open: false, groups: 0 });
    };
    handleCodeChange = (event, value) => {
        this.setState({ tel_confirm_code: value });
    };
    handleSubmit_tel = () => {
        if (this.state.submit_state === '提交'){
            this.setState({ submit_state: '' });
            restClient(GET_ONE, `unlock/${this.state.groups}`, { id: this.state.tel_confirm_code })
                .then((response) => {
                    if (response.status < 200 || response.status >= 300) {
                        this.setState({ error_text: '无效的验证码', submit_state: '提交' });
                        throw new Error(response.statusText);
                    }
                    return response.data;
                }).then(
                () => {
                    this.setState({ telephone_c: true, submit_state: '完成' , tel_confirm_code: '验证成功，请继续操作', error_text: '' });
                },
                () => { this.setState({ error_text: '无效的验证码', submit_state: '提交' }); },
            );
        } else if (this.state.submit_state === '完成') {
            this.setState({
                tel_open: false,
            });
            if (!this.state.submit_save) {
                this.handleChange(0, 0, this.state.groups);
            }
            this.setState({ submit_save: false });
        }
    };
    handleSave(){
        console.log(this.handsontableData);
        this.setState({ submit_save: true });
        restClient(UPDATE, 'members', { id: this.state.groups, data: this.handsontableData }).then(
            (response) => {
                this.setState({
                    save_success: true,
                    change: true,
                });
                this.handleChange(0, 0, this.state.groups);
            },
            (response) =>{
                if (response.status === 401) {
                    this.setState({ tel_open: true });
                }
            },
        );
    }
    render() {
        const actions=[
            <FlatButton label="关闭" onClick={this.handleClose.bind(this)} primary={true} />,
        ];
        const tel_actions =[
            <FlatButton
                label="取消"
                secondary={true}
                onClick={this.handleClose_tel}
            />,
            <FlatButton
                label={this.state.submit_state}
                primary={true}
                onClick={this.handleSubmit_tel}
            >
                {this.state.submit_state ? '' : <CircularProgress size={20} thickness={4} style={{ verticalAlign: 'top', marginTop: '10' }}/>}
            </FlatButton>,
        ];
        const {loading, stepIndex, groups, member_loaded} = this.state;
        return(
            <div>
                <Paper>
                    <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconButton>
                            <CommunicationContacts />
                        </IconButton>
                        <DropDownMenu value={this.state.groups} onChange={this.handleChange} style={{ marginBottom: '4 px' }}>
                            <MenuItem value={0} primaryText="选择圈子" />
                            {this.state.group_list_loaded ? this.state.group_list.map(
                                (item) => {
                                    return (
                                        <MenuItem value={item.id} primaryText={item.description} key={item.id} />
                                    );
                                },
                            ) : '' }
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="通讯录管理" />
                        { groups ?
                            <FlatButton label="保存" disabled={groups === 0} onClick={this.handleSave.bind(this)} /> :
                            ''
                        }
                        <ToolbarSeparator />
                        <RaisedButton label="导出通讯录" primary={true} disabled={groups === 0} onClick={this.handleOnDownload.bind(this)} />
                        <RaisedButton label="导入通讯录" secondary={true} onClick={this.handleOnUpload.bind(this)} disabled={groups === 0} />
                        <IconMenu
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                            }
                        >
                            <MenuItem primaryText="清空通讯录" onClick={() => { if(groups && window.confirm('确定要清空全部数据？')) { this.handsontableData = [['', '', '', '', '']]; this.handleSave(); }}} disabled={groups === 0} />
                            <MenuItem primaryText="More Info" />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                    { groups ?
                        (member_loaded ?
                        <div>
                            <HotTable root="hot" data={this.handsontableData}
                                      colHeaders={['编号', '姓名', '电话', '住址', '备注']} rowHeaders={false}
                                      minRows={100} height={window.innerHeight - 200} stretchH="all" style={{ width: '100%' }}
                                      maxCols={5} onClick={ () => this.setState({change: true}) }
                            />
                        </div>
                            : <CircularProgress />)
                        :
                            <img src="https://s1.ax1x.com/2018/01/07/pZXU91.png" style={{ width: '100%' }} />
                    }
                </Paper>
                <Dialog open={this.state.upload} title="上传通讯录文件" actions={actions} modal={true}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>上传文件</StepLabel>

                        </Step>
                        <Step>
                            <StepLabel>解析数据</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>完成</StepLabel>
                        </Step>
                    </Stepper>
                    <ExpandTransition loading={loading} open={true}>
                        {this.renderContent()}
                    </ExpandTransition>
                </Dialog>
                <Dialog
                    title="二次认证"
                    actions={tel_actions}
                    modal={true}
                    open={this.state.tel_open}
                    onRequestClose={this.handleClose_tel}
                >
                    您正在进行敏感数据操作，为了您的数据安全，请认证手机<br />
                    <div>
                        <TextField hintText="手机验证码" floatingLabelFixed={false} value={this.state.tel_confirm_code} onChange={this.handleCodeChange} errorText={this.state.error_text} />
                        <FlatButton label={ this.state.step ? ( "获取验证码(" + this.state.step + ")" ) : '获取验证码' }
                                    onClick={this.sendSMS}
                                    disabled={ !!this.state.step }
                                    style={{ verticalAlign: 'top' , marginTop: '5' }}
                        />
                    </div>
                </Dialog>
                <Snackbar open={this.state.save_success} message={'保存成功！'} autoHideDuration={4000}
                          onRequestClose={this.handleCloseSnack} bodyStyle={{ backgroundColor: 'green' }} />
            </div>
        );

    }
}

export const Member = MemberList;
