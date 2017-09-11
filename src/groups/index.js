import React from 'react';
import GridList from './GridList';
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
    CheckboxGroupInput
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/social/group';
import { Card } from 'material-ui/Card';
import { FlatButton } from 'material-ui/FlatButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import EditButton from "../buttons/EditButton";


export const GroupIcon = Icon;
const equLength = len => (value, allValues, props) =>
    value && value.length !== len ? props.translate('resources.groups.fields.telephone_validate') : undefined;
const required = value => value ? undefined : 'Required';
const errorEmail = (value, allValues, props) =>
    value && (!(value.indexOf('@') + 1) || !(value.indexOf('.') + 1)) ? props.translate('resources.groups.fields.email_validate') : undefined;

export const GroupList = (props) => (
    <List {...props} title="resources.groups.my_group">
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="type"/>
            <TextField source="members" style={{ textAlign: 'right' }} />
            <TextField source="balance" style={{ textAlign: 'right' }} />
            <EditButton />

        </Datagrid>
    </List>
);


export const GroupCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.groups.tabs.details">
                <TextInput source="group_name" validation={{ required: true }} style={{ display: 'inline-block' }} elStyle={{ width: '10em' }} vali />
                <TextInput source="group_shortname" style={{ display: 'inline-block', marginLeft: 16 }} elStyle={{ width: '5em' }} />
                <AutocompleteInput source="group_type" choices={[
                    { id: 'Association', name: 'association'},
                    { id: 'Student_Union', name: 'student_union'},
                    { id: 'Team', name: 'team'},
                    { id: 'Class', name: 'classes'},
                    { id: 'College', name: 'college'},
                    { id: 'Match', name: 'match'},
                ]}/>

                <FileInput source="files" label="Related files" accept="application/jpg" placeholder={<p>Drop your file here</p>}>
                    <ImageField source="src" title="title" />
                </FileInput>
                <LongTextInput source="group_description" options={{ rows: 5, fullWidth: true }} validation={{ required: true }} />
            </FormTab>
            <FormTab label="resources.groups.tabs.manager">
                <TextInput source="manager_name" validation={{ required: true }} />
                <TextInput source="telephone" validation={{ required: true }} validate={[ equLength(11) ]} style={{ display: 'inline-block' }} elStyle={{ width: '6em' }} />
                <CheckboxGroupInput source="telephone_visiable" style={{ display: 'inline-block', marginLeft: 16 }} choices={[{ id: 'yes', name: 'tele_public' }]} />
                <TextInput source="email" validation={{ required: true }} validate={[ errorEmail ]} elStyle={{ width: '12em' }} />
                <NumberInput source="height" validation={{ required: true }}  elStyle={{ width: '5em' }} />
                <ReferenceInput source="category_id" reference="categories" allowEmpty>
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" validation={{ required: true }} elStyle={{ width: '5em' }} />
            </FormTab>
        </TabbedForm>
    </Create>
);