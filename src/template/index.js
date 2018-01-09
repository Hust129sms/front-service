import React,{ Component }  from 'react';

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
    TextField,
    TextInput,
    ViewTitle,
    FileInput,
    AutocompleteInput,
    ImageField,
    CheckboxGroupInput,
    DisabledInput,
    GET_LIST,
    DELETE
} from 'admin-on-rest';
import { Paper, Drawer, RaisedButton, Divider, Dialog, FlatButton, Snackbar } from 'material-ui';
import DeleteButton from "../buttons/DeleteButton";
import restClient from '../restClient';

import TplEditComponent from './TplEdit';

const styles = {
    welcome: { marginBottom: '2em' },
    flex: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap-reverse' },
    leftCol: { width: '60%', marginRight: '1em' },
    rightCol: { width: '320px' },
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
class TplListC extends Component{
    constructor(props) {
        super();
        this.props = props;
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
        group_list: [{ id: 0, name: '' }],
        group_list_loaded: false,
    };
    componentWillMount(){
        restClient(GET_LIST, 'groups', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'ASC' },
            filter: {},
        }).then(
            (response) => {
                return response.data;
            }, (err) => {
                if (err.status === 403) {
                    window.location = '#/login';
                }
            },
        ).then(
            (data) => {
                const list = [];
                data.map((item) => list.push({ id: item.id, name: item.description })) ;
                return list;
            },
        ).then(
            (list) => {
                this.setState({ group_list_loaded: true, group_list: list });
            },
        );
    }
    componentDidMount(){
        this.count = 0;
    }

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
    handleDelete() {
        this.setState({ deleted: true });
        restClient(GET_LIST, 'templates',{
            pagination: { page: this.props.location.search ==='' ? 1 : this.props.location.search.replace(/.*page=/,"").replace(/[!0-9].*/,"") , perPage: 25 },
            sort: { field: 'title', order: 'ASC' },
            filter: { author_id: 12 },
        }, (err) => {
            if (err.status === 403) {
                window.location = '#/login';
            }
        },).then((response) => { this.content = response.data; console.log(this.content); }).then(
            () => {
                this.setState({ dia_open: true });
            },
        );
    }
    handleCloseDia(){
        this.setState({ dia_open: false });
    }
    handleSubmitDia(){
        this.state.last.map((id) => {
            if (this.content.length >= id) {
                restClient(DELETE, 'templates',{
                    id: this.content[id].id,
                });
            }
        });
        this.setState({ dia_open: false, snack: true, tips: '删除成功' });
    }
    handleRequestClose() {
        this.setState({ snack: false });
        window.history.go(0);
    }
    render() {
        const { group_list_loaded } = this.state;
        const actions = [
            <FlatButton label="取消" secondary="true" onClick={this.handleCloseDia.bind(this)} />,
            <FlatButton label="确定" primary="true" onClick={this.handleSubmitDia.bind(this)} />,
        ];
        const PostFilter = (props) => (
                <Filter {...props}>
                    <SelectInput label="圈子" source="group" optionText="name" choices={this.state.group_list} />
                    <TextInput label="内容" source="content" />
                    <SelectInput label="状态" source="status" choices={[{id: 0, name: '审核中' }, {id: 1, name: '审核通过' }, {id:2, name: '审核失败' }]} />
                </Filter>
        );
        return(
            <div>
            <List {...this.props} title="resources.templates.name" perPage={25} filters={<PostFilter />}>
                <Datagrid
                    headerOptions={{ adjustForCheckbox: true, displaySelectAll: true }}
                    bodyOptions={{ displayRowCheckbox: true }}
                    rowOptions={{ selectable: true }}
                    options={{ multiSelectable: true , onRowSelection: this.handleRowClick.bind(this) }}
                >
                    <TextField source="id" style={{ width: '5%' }} sortable={false} />
                    <TextField source="group" style={{ width: '10%' }} sortable={false} />
                    <TextField source="content" style={{ width: '75%' }} multiLine="true" sortable={false} />
                    <TextField source="status" style={{ width: '10%' }} sortable={false} />
                    <DeleteButton />
                </Datagrid>
            </List>
                <Drawer width={100} openSecondary={true} open={this.state.open} >
                    <Paper style={{ textAlign: 'center' }}>
                        <div style={{ marginTop: '7' }}>{`已选中${this.state.index.length === 25 ? '全部' : this.state.index.length}条`}</div>
                        <Divider />
                        <div style={{marginTop: '10', fontSize: '12'}}>{'操作'}</div>
                    <RaisedButton label={'删除'} secondary={true} onClick={this.handleDelete.bind(this)} />
                    </Paper>
                </Drawer>
                <Dialog open={this.state.dia_open} autoScrollBodyContent={true} actions={actions}>
                    您选择删除以下模板，请确认操作。<p />
                    {this.state.deleted ? this.state.last.map((id) => {
                        if (this.content.length > id) {
                            return (
                                <div>{`${this.content[id].id} ${this.content[id].content}`} </div>
                            );
                        }
                        return ('');
                        },
                    ) : ''}
                </Dialog>
                <Snackbar open={this.state.snack} onRequestClose={this.handleRequestClose.bind(this)} autoHideDuration={5000} message={this.state.tips} />
            </div>
        );

    }
}

export const TplList = TplListC;

export const TplEdit = TplEditComponent;
export const TemplateDelete = (props) => <Delete {...props} title={`模板删除后再次创建需要重新审核，请确认删除`}/>;