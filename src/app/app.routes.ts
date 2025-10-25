import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { LayoutPage } from './pages/layout-page/layout-page';
import { LoginPage } from './pages/login-page/login-page';

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
                path: 'profile',
                component: DashboardPage
            },
            {
                path: 'settings',
                component: DashboardPage
            },
        ]
    }
];
