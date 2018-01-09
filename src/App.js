import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Delete, Resource} from 'admin-on-rest';

import './App.css';

import authClient from './authClient';
import sagas from './sagas';
import themeReducer from './themeReducer';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
import { Dashboard } from './dashboard';
import { TopUp } from './topup';
import customRoutes from './routes';
import translations from './i18n';

import { VisitorList, VisitorEdit, VisitorDelete, VisitorIcon } from './visitors';
import { CommandList, CommandEdit, CommandIcon } from './commands';
import { ProductList, ProductCreate, ProductEdit, ProductIcon } from './products';
import { CategoryList, CategoryEdit, CategoryIcon } from './categories';
import { ReviewList, ReviewEdit, ReviewIcon } from './reviews';
import { GroupList, GroupIcon, GroupCreate, GroupEdit, GroupDelete } from './groups';
import { user, userEdit} from './user';
import { HistoryChargeList } from './groups/HistoryCharge';
import { BillList } from './topup/bills';
import { Member } from './members';
import { TplList, TplEdit, TplCreate, TemplateDelete } from './template';
import restClient from './restClient';

class App extends Component {

    render() {
        return (
            <Admin
                title="飞羽管理后台"
                restClient={restClient}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authClient={authClient}
                dashboard={Dashboard}
                loginPage={Login}
                locale='ch'
                appLayout={Layout}
                menu={Menu}
                messages={translations}
                topup={TopUp}
            >

                <Resource name="groups" list={GroupList} icon={GroupIcon} create={GroupCreate} edit={GroupEdit} remove={GroupDelete} />
                <Resource name="customers" list={VisitorList} edit={VisitorEdit} remove={VisitorDelete} icon={VisitorIcon} />
                <Resource name="commands" list={CommandList} edit={CommandEdit} remove={Delete} icon={CommandIcon} options={{ label: 'Orders' }}/>
                <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} remove={Delete} icon={ProductIcon} />
                <Resource name="categories" list={CategoryList} edit={CategoryEdit} remove={Delete} icon={CategoryIcon} />
                <Resource name="reviews" list={ReviewList} edit={ReviewEdit} icon={ReviewIcon} />
                <Resource name="topup" list={TopUp} />
                <Resource name="user" list={user} edit={userEdit} />
                <Resource name="charge_group_history" list={HistoryChargeList} />
                <Resource name="bills" list={BillList} />
                <Resource name="templates" list={TplList} create={TplEdit} remove={TemplateDelete} />
                <Resource name="members" list={Member} />
            </Admin>
        );
    }
}

export default App;
