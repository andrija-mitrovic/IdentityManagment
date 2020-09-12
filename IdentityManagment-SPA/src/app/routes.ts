import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'employees', component: EmployeeListComponent, resolve: {employees: EmployeeListResolver}},
            {path: 'employees/create', component: EmployeeCreateComponent},
            {path: 'employee/edit/:id', component: EmployeeEditComponent, resolve: {employee: EmployeeEditResolver}},
            {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
