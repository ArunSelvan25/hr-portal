import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { LayoutPage } from './pages/layout-page/layout-page';
import { LoginPage } from './pages/login-page/login-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { RoleMasterPage } from './pages/role-master-page/role-master-page';

export const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginPage
    },
    {
        path: '',
        component: LayoutPage,
        children: [
            {
                path: 'dashboard',
                component: DashboardPage
            },
            {
                path: 'teams',
                component: RoleMasterPage
            },
            {
                path: 'profile',
                component: ProfilePage
            },
            {
                path: 'settings',
                component: SettingsPage
            },
        ]
    }
];
