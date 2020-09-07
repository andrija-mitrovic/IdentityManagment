import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { EmployeesComponent } from './employees/employees.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [],
        children: [
            {path: 'employees', component: EmployeesComponent},
            {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
