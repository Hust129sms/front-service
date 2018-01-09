import React, {Component} from 'react';
import { Paper, TextField, SelectField, CardTitle, MenuItem, Checkbox, Divider, RaisedButton, Dialog, FlatButton } from 'material-ui';
import ContentSave from 'material-ui/svg-icons/content/save';
import { GET_LIST, GET_MANY, GET_ONE, CREATE } from 'admin-on-rest';
import restClient from '../restClient';


const styles = {
    welcome: { marginBottom: '2em' },
    flex: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap-reverse' },
    flex2: { display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap' },
    leftCol: { width: '60%', marginRight: '1em' },
    rightCol: { width: '320px' },
    rightCol2: { width: '30%', height: '70px' },
    singleCol: { marginTop: '2em' },
    devices_ios: {
        width: '320px',
        height: '548px',
        background: '#111',
        borderRadius: '55px',
        boxShadow: '0px 0px 0px 2px #aaa',
        padding: '105px 20px',
        position: 'relative',
        marginRight: '80px'
    },
    device_inner: {
        backgroundColor: '#FFF',
        height: '100%',
    },
    send:{
        position: 'relative',
        width: '220px',
        background: '#bde9ff',
        borderRadius: '5px',
        margin: '0px 30px 0px auto',
        padding: '4px',
    },
    send_arrow: {
        position: 'absolute',
        top: '5px',
        right: '-16px',
        width: '0',
        height: '0',
        fontSize: '0',
        border: 'solid 8px',
        borderColor: '#4D494800 #4D494800 #4D494800 #bde9ff',
    },
};

export default class TplEditComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            selected: '',
            sig: '请选择圈子',
            content: '',
            groups: [{ id:0, value: 0, name: 'loading...' }],
            short: false,
            short_sig: '圈子',
            pre_tpl: 0,
            pre_tpl_t: [
                '',
                '亲爱的#name#同学，我们将在#time#于#locate#举行#event#，欢迎你的到来～详情可戳：#url#',
                '亲爱的#name#同学，#match#的#event#将在#time#于#locate#进行，请务必到场，收到请回复。',
                '学院将在#time#于#locate#进行#event#，请务必到场，收到请回复。',
                '亲爱的#name#同学，恭喜你通过了#test#，成为了#group#的一员！',
            ],
            open: false,
        };
    }

    handleChange = (event) => {
        this.setState( {content: event.target.value} );
    };
    handleChangeG = (event, index, value) => {
        this.setState({ group: value, short_sig: this.state.groups[index].group_shortname, sig: this.state.groups[index].name });
    };
    handleChangeT = (event, index, value) => {
        this.setState({ pre_tpl: value, content: this.state.pre_tpl_t[value] });
    };
    handleSubmit = () =>{
        if (this.state.short ?
                (this.state.short_sig ? this.state.short_sig : this.state.sig) :
                this.state.sig === '请选择圈子' || this.state.short ? (this.state.short_sig ? this.state.short_sig : this.state.sig) : this.state.sig === '圈子圈子') {
            // TODO Here is a bug need to be repaired
            return;
        }
        restClient(CREATE, 'templates', { data: {
            title: this.state.title || 'test',
            sig: this.state.short ? (this.state.short_sig ? this.state.short_sig : this.state.sig) : this.state.sig,
            content: this.state.content,
            group_id: this.state.group,
        }}).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            console.log(response);
            return response.data;}, (err) => {
                if (err.status === 403) {
                    window.location = '#/login';
                }
            },
            ).then(
                (response) => {
                    if (response.content === this.state.content) {
                        this.setState({open: true});
                    }
                }
            )
    };
    componentDidMount() {
        restClient(GET_LIST, 'groups', {
            pagination: {page: 1, perPage: 100},
            sort: { field: 'id', order: 'ASC' },
            filter: {},
        })
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
                (datas) => { this.setState({ groups: datas }); }
            );
    }
    handleCheck = () => {
        this.setState({
            short: !this.state.short,
        });
    }
    handleClose = () => {
        window.location = '#/templates';
    }
    render(){
        const actions=[
            <FlatButton label="好的"
                primary={true}
                onClick={this.handleClose} >
            </FlatButton>
        ];
        return (
            <div style={styles.flex} >
                <div style={styles.leftCol} >
                    <Paper sytle={{ paddingTop: '10px' }}>
                        <CardTitle title={'短信模板'} subtitle={this.props.authParams.route === 'create' ? "创建新模板" : `编辑 #${this.props.authParams.route}` } />
                        <div style={{ marginLeft: '32px' }}>
                            <div style={styles.flex2}>
                                <SelectField floatingLabelText="请选择圈子" onChange={this.handleChangeG.bind(this)} value={ this.state.group } style={styles.leftCol}>
                                    {this.state.groups.map(data=>(
                                        <MenuItem key={data.id} value={data.id} primaryText={data.name} />
                                    ))}
                                </SelectField>
                                <div style={styles.rightCol2}>
                                    <Checkbox style={{ marginTop: '38px' }} label="使用简称"  onCheck={this.handleCheck.bind(this)} />
                                </div>
                            </div>
                            <SelectField floatingLabelText="常用模板" hintText={'常用短信模板'} onChange={this.handleChangeT.bind(this)} value={this.state.pre_tpl} menuItemStyle={{ whiteSpace: 'wrap', borderBottom: '1px solid #dddddd', borderTop: '1px solid #dddddd' }} style={{ width: '80%' }} >
                                {this.state.pre_tpl_t.map((tpl, number) => (
                                        <MenuItem key={number} value={number} primaryText={tpl}  />
                                ))}
                            </SelectField>
                                <br />
                            <TextField multiLine={true} hintText={'在此处编辑短信'} floatingLabelText={'模板内容'} value={this.state.content} onChange={this.handleChange.bind(this)} rows={5} style={{width: '80%'}} />
                            <RaisedButton label='保存'
                                          primary={true}
                                          style={{
                                              marginBottom: '16px',
                                              marginLeft: '30%',
                                          }}
                                          icon={<ContentSave />}
                                          onClick={this.handleSubmit.bind(this)}
                            />


                        </div>
                        <Dialog
                            open={this.state.open}
                            modal={false}
                            actions={actions}
                        >
                            创建成功！审核通过后即可利用该模版发送。
                        </Dialog>
                    </Paper>
                </div>

                <div style={styles.rightCol} >
                    <div style={styles.devices_ios} >
                        <div style={styles.device_inner}>
                            <div style={{ width: '320px', height: '548px', backgroundImage: 'url(http://console.fiiyu.com/message.jpeg)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }} >
                                <div style={{ height: '80px' }} > &nbsp; </div>
                                <div style={styles.send}>
                                    <div style={styles.send_arrow} />
                                    {`【${this.state.short ? (this.state.short_sig ? this.state.short_sig : this.state.sig) : this.state.sig}】${this.state.content}`.replace('#name#', '张三')
                                        .replace('#time#', '2017年9月1日').replace('#locate#','东九楼A101').replace('#event#', '会议')
                                        .replace('#url#', 'http://t.cn/abcd').replace('#match#', 'xx比赛').replace('#collage#', 'xx学院')
                                        .replace('#test#', '测试').replace('#group#', '学生会')
                                    }
                                </div>
                                <div style={{ float: 'right', marginRight: '60px', marginTop: '10px', color: '#aaaaaa', fontSize: '13px' }}>
                                    {`约${`【${this.state.short ? this.state.short_sig : this.state.sig}】${this.state.content}`.length}字`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
