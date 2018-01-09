import React from 'react';
import { Link } from 'react-router-dom';

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
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/social/group';
import { IconButton} from 'material-ui';
import ActionHelp from 'material-ui/svg-icons/action/help';
import { Card } from 'material-ui/Card';
import { FlatButton } from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import TopUpButton from "../buttons/TopUpGroup";
import GridList from './HistoryCharge';
import Actions from './actions'

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};



export const GroupIcon = Icon;
const equLength = len => (value, allValues, props) =>
    value && value.length !== len ? props.translate('resources.groups.fields.telephone_validate') : undefined;
const required = (value, t, props) => value ? undefined : props.translate('aor.validation.required');
const errorEmail = (value, allValues, props) =>
    value && (!(value.indexOf('@') + 1) || !(value.indexOf('.') + 1)) ? props.translate('resources.groups.fields.email_validate') : undefined;

export const GroupList = (props) => (
        <List {...props} title="resources.groups.my_group" actions={<Actions />}>
            <Datagrid>
                <TextField source="id" style={{ width: '10%' }} />
                <TextField source="name" style={{ width: '15%' }} />
                <TextField source="type" style={{ width: '10%' }} />
                <TextField source="members" style={{ textAlign: 'left', width: '5%'}} />
                <TextField source="balance" style={{ textAlign: 'right', width: '10%' }} />
                <TopUpButton />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
);

export const GroupCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.groups.tabs.details">
                    <TextInput source="group_name" validation={{ required: true }} validate={[required]} style={{ display: 'inline-block',  }} elStyle={{ width: '10em' }} vali />
                    <TextInput source="group_shortname" style={{ display: 'inline-block', marginLeft: 16, verticalAlign: 'top' }} elStyle={{ width: '5em' }} />
                    <AutocompleteInput validate={[required]} source="group_type" choices={[
                        { id: 'Association', name: '社团/协会'},
                        { id: 'Student_Union', name: '学生会'},
                        { id: 'Team', name: '团队'},
                        { id: 'Class', name: '班级'},
                        { id: 'College', name: '学院'},
                        { id: 'Match', name: '赛事'},
                    ]} />
                <LongTextInput validate={[required]} source="group_description" options={{ rows: 5, fullWidth: true }} validation={{ required: true }} />
            </FormTab>
            <FormTab label="resources.groups.tabs.manager">
                <TextInput validate={[required]} source="manager_name" validation={{ required: true }} />
                <TextInput source="telephone" validation={{ required: true }} validate={[equLength(11), required]} style={{ display: 'inline-block' }} elStyle={{ width: '6em' }} />
                <CheckboxGroupInput  style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: 16, width: '6em',marginTop: 16 }} choices={[{ id: 'yes', name: 'resources.groups.fields.tele_public' }]} />
                <IconButton tooltip="使你的手机号对圈子成员公开" style={{ display: 'inline-block', marginLeft: -10 , marginTop: 10, verticalAlign: 'top' }}>
                    <ActionHelp />
                </IconButton>
                <TextInput source="email" validation={{ required: true }} validate={[errorEmail]} elStyle={{ width: '12em' }} />
            </FormTab>
        </TabbedForm>
    </Create>
);

const GroupTitle = ({ record }) => {
    return <span>圈子 { record ? `"${record.name}"` : ''}</span>;
};

export const GroupEdit = (props) => (
    <Edit titile={<GroupTitle />} {...props}>
        <TabbedForm>
            <FormTab label="resources.groups.tabs.details">
                <DisabledInput source="id" />
                <TextInput source="group_name" validation={{ required: true }} style={{ display: 'inline-block' }} elStyle={{ width: '10em' }} vali />
                <TextInput source="group_shortname" style={{ display: 'inline-block', marginLeft: 16 }} elStyle={{ width: '5em' }} />
                <AutocompleteInput source="group_type" choices={[
                    { id: 'Association', name: '社团/协会'},
                    { id: 'Student_Union', name: '学生会'},
                    { id: 'Team', name: '团队'},
                    { id: 'Class', name: '班级'},
                    { id: 'College', name: '学院'},
                    { id: 'Match', name: '赛事'},
                ]} />
                <LongTextInput source="group_description" options={{ rows: 5, fullWidth: true }} validation={{ required: true }} />

            </FormTab>
            <FormTab label="resources.groups.tabs.manager">
                <TextInput source="manager_name" validation={{ required: true }} />
                <TextInput source="telephone" validation={{ required: true }} validate={[ equLength(11) ]} style={{ display: 'inline-block' }} elStyle={{ width: '6em' }} />
                <CheckboxGroupInput source="telephone_visiable" style={{ display: 'inline-block', marginLeft: 16 }} choices={[{ id: 'yes', name: 'tele_public' }]} />
                <IconButton tooltip="使你的手机号对圈子成员公开" style={{ display: 'inline-block' }}>
                    <ActionHelp />
                </IconButton>
                <TextInput source="email" validation={{ required: true }} validate={[ errorEmail ]} elStyle={{ width: '12em' }} />
            </FormTab>
        </TabbedForm>
    </Edit>
)

const GroupDeleteTitle = translate(({ record, translate }) => <span>
    所属成员也将被删除，该操作不可恢复&nbsp;
</span>);


export const GroupDelete = (props) => <Delete {...props} title={<GroupDeleteTitle />} />;