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
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/social/group';
import { Card } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export const GroupIcon = Icon;



export const GroupList = props => (
    <List {...props} perPage={20}>
        <GridList />
    </List>
);

export const GroupCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.groups.tabs.details">
                <TextInput source="group_name" options={{ fullWidth: true }} validation={{ required: true }} />
                <LongTextInput source="group_description" options={{ fullWidth: true }} validation={{ required: true }} />
            </FormTab>
            <FormTab label="resources.products.tabs.details">
                <TextInput source="reference" validation={{ required: true }} />
                <NumberInput source="price" validation={{ required: true }} elStyle={{ width: '5em' }} />
                <NumberInput source="width" validation={{ required: true }} style={{ display: 'inline-block' }} elStyle={{ width: '5em' }} />
                <NumberInput source="height" validation={{ required: true }} style={{ display: 'inline-block', marginLeft: 32 }} elStyle={{ width: '5em' }} />
                <ReferenceInput source="category_id" reference="categories" allowEmpty>
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" validation={{ required: true }} elStyle={{ width: '5em' }} />
            </FormTab>
            <FormTab label="resources.products.tabs.description">
                <RichTextInput source="description" addLabel={false}/>
            </FormTab>
        </TabbedForm>
    </Create>
);

export const ProductCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.products.tabs.image">
                <TextInput source="image" options={{ fullWidth: true }} validation={{ required: true }} />
                <TextInput source="thumbnail" options={{ fullWidth: true }} validation={{ required: true }} />
            </FormTab>
            <FormTab label="resources.products.tabs.details">
                <TextInput source="reference" validation={{ required: true }} />
                <NumberInput source="price" validation={{ required: true }} elStyle={{ width: '5em' }} />
                <NumberInput source="width" validation={{ required: true }} style={{ display: 'inline-block' }} elStyle={{ width: '5em' }} />
                <NumberInput source="height" validation={{ required: true }} style={{ display: 'inline-block', marginLeft: 32 }} elStyle={{ width: '5em' }} />
                <ReferenceInput source="category_id" reference="categories" allowEmpty>
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" validation={{ required: true }} elStyle={{ width: '5em' }} />
            </FormTab>
            <FormTab label="resources.products.tabs.description">
                <RichTextInput source="description" addLabel={false}/>
            </FormTab>
        </TabbedForm>
    </Create>
);