import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [],
        children: [
            {path: 'employees', component: EmployeeListComponent},
            {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
