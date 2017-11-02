import React, { Component } from 'react';
import restClient from '../restClient';
import {GET_ONE,AppBarMobile} from 'admin-on-rest';
import withWidth from 'material-ui/utils/withWidth';
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
    AutocompleteInput,
    ImageField,
    CheckboxGroupInput,
    DisabledInput,
} from 'admin-on-rest';




import { Card, CardTitle, FlatButton, Divider, TextField } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';



import userComponent from './user';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginRight: 16,
        display: 'inline-block'
    },

};




export const user = userComponent;

const equLength = len => (value, allValues, props) =>
    value && value.length !== len ? props.translate('resources.groups.fields.telephone_validate') : undefined;

const errorEmail = (value, allValues, props) =>
    value && (!(value.indexOf('@') + 1) || !(value.indexOf('.') + 1)) ? props.translate('resources.groups.fields.email_validate') : undefined;

const userTitle = ({ record }) => {
    return <span>用户 { record ? `"${record.name}"` : '用户信息'}</span>;
};

const UserActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, refresh }) => (
    <div></div>
);

class useredit extends Component { 
    state={}

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
        const { width } = this.props;
        return(
            <div>
                {width === 1 && <AppBarMobile title="用户" />}
            <TextField
            value={this.state.username}
            floatingLabelText="用户名"
            floatingLabelFixed={true}
            style={{display: 'inline-block'}}
            underlineShow = {false}
        /><br/>
            </div>
        );
    }

}

export const userEdit = (props) => (
    <Edit titile={<userTitle />} {...props}  actions={<UserActions/>}>
        <TabbedForm>
            <FormTab >

                <TextField value="想打人" />
                <TextInput source="telephone" validation={{ required: true }} validate={[ equLength(11) ]} style={{ display: 'inline-block' }} elStyle={{ width: '6em' }} />
                <CheckboxGroupInput source="telephone_visiable" style={{ display: 'inline-block', marginLeft: 16 }} choices={[{ id: 'yes', name: 'tele_public' }]} />
                <TextInput source="email" validation={{ required: true }} validate={[ errorEmail ]} elStyle={{ width: '12em' }} />
            </FormTab>
        </TabbedForm>
    </Edit>
)

