import React from 'react';
import {
    AutocompleteInput,
    translate,
    CheckboxGroupInput,
    Create,
    Datagrid,
    DateField,
    Edit,
    EditButton,
    FileInput,
    Filter,
    FormTab,
    ImageField,
    List,
    LongTextInput,
    NumberInput,
    ReferenceInput,
    ReferenceManyField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    BooleanInput
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/image/collections';
import Chip from 'material-ui/Chip';
import RichTextInput from 'aor-rich-text-input';

import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from '../reviews/StarRatingField';
import GridList from './GridList';
import Poster from './Poster';


export const ProductIcon = Icon;

const equLength = len => (value, allValues, props) =>
    value && value.length !== len ? props.translate('resources.groups.fields.telephone_validate') : undefined;

const errorEmail = (value, allValues, props) =>
    value && (!(value.indexOf('@') + 1) || !(value.indexOf('.') + 1)) ? props.translate('resources.groups.fields.email_validate') : undefined;

const QuickFilter = translate(({ label, translate }) => <Chip>{translate(label)}</Chip>);

export const ProductFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <ReferenceInput source="category_id" reference="categories">
            <SelectInput source="name" />
        </ReferenceInput>
        <NumberInput source="width_gte" />
        <NumberInput source="width_lte" />
        <NumberInput source="height_gte" />
        <NumberInput source="height_lte" />
        <QuickFilter label="resources.products.fields.stock_lte" source="stock_lte" defaultValue={10} />
    </Filter>
);

export const ProductList = props => (
    <List {...props} filters={<ProductFilter />} perPage={20}>
        <GridList />
    </List>
);

export const ProductCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.groups.tabs.details">
                <TextInput source="group_name" validation={{ required: true }} style={{ display: 'inline-block' }} elStyle={{ width: '10em' }} />
                <TextInput source="group_shortname" style={{ display: 'inline-block', marginLeft: 16 }} elStyle={{ width: '5em' }} />
                <FileInput source="files" label="Related files" accept="application/jpg" style={{ display: 'inline-block' }} placeholder={<p>Drop your file here</p>}>
                    <ImageField source="src" title="title" />
                </FileInput>
                <AutocompleteInput source="group_type" choices={[
                    { id: 'Association', name: 'association'},
                    { id: 'Student_Union', name: 'student_union'},
                    { id: 'Team', name: 'team'},
                    { id: 'Class', name: 'classes'},
                    { id: 'College', name: 'college'},
                    { id: 'Match', name: 'match'},
                ]}/>

                <LongTextInput source="group_description" options={{ rows: 5, fullWidth: true }} validation={{ required: true }} />
            </FormTab>
            <FormTab label="resources.groups.tabs.manager">
                <TextInput source="manager_name" validation={{ required: true }} />
                <TextInput source="telephone" validation={{ required: true }} validate={[ equLength(11) ]} style={{ display: 'inline-block' }} elStyle={{ width: '6em' }} />
                <BooleanInput source="telephone_visiable" style={{ display: 'inline-block', marginTop: 0, verticalAlign: 'bottom' }} choices={[{ id: 'yes', name: 'tele_public' }]} />
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


const ProductTitle = ({ record }) => <span>Poster #{record.reference}</span>;
export const ProductEdit = (props) => (
    <Edit {...props} title={<ProductTitle />}>
        <TabbedForm>
            <FormTab label="resources.products.tabs.image">
                <Poster />
                <TextInput source="image" options={{ fullWidth: true }} />
                <TextInput source="thumbnail" options={{ fullWidth: true }} />
            </FormTab>
            <FormTab label="resources.products.tabs.details">
                <TextInput source="reference" />
                <NumberInput source="price" elStyle={{ width: '5em' }} />
                <NumberInput source="width" style={{ display: 'inline-block' }} elStyle={{ width: '5em' }} />
                <NumberInput source="height" style={{ display: 'inline-block', marginLeft: 32 }} elStyle={{ width: '5em' }} />
                <ReferenceInput source="category_id" reference="categories">
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" elStyle={{ width: '5em' }} />
            </FormTab>
            <FormTab label="resources.products.tabs.description">
                <RichTextInput source="description" addLabel={false}/>
            </FormTab>
            <FormTab label="resources.products.tabs.reviews">
                <ReferenceManyField reference="reviews" target="product_id" addLabel={false}>
                    <Datagrid>
                        <DateField source="date" />
                        <CustomerReferenceField />
                        <StarRatingField />
                        <TextField source="comment" style={{ maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
);
