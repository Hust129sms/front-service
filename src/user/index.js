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
    SimpleForm,
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
    return <span>{ "用户信息" }</span>;
};

const UserActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, refresh }) => (
    <div></div>
);

export const userEdit = (props) => (
    <Edit titile={<userTitle />} {...props} actions={<UserActions />}>

            <SimpleForm>
                <div>下列部分信息提交后将不可更改，请仔细填写。我们保证你的信息不会泄漏。</div>
                <TextInput source="telephone" validation={{ required: true }} validate={[ equLength(11) ]} style={{ display: 'inline-block' }} elStyle={{ width: '6em' }} />
                <TextInput source="email" validation={{ required: true }} validate={[ errorEmail ]} elStyle={{ width: '12em' }} />
                <TextInput source="id_card" />
                <TextInput source="qq" />
                <TextInput source="school" />
                <TextInput source="student_no" />
                <TextInput source="name" />
        </SimpleForm>
    </Edit>
)

