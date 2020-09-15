import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { UserManagmentComponent } from './admin/user-managment/user-managment.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RolesModelComponent } from './admin/roles-model/roles-model.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeService } from './_services/employee.service';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AdminService } from './_services/admin.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [			
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserManagmentComponent,
      AdminPanelComponent,
      RolesModelComponent,
      EmployeeListComponent,
      EmployeeCreateComponent,
      EmployeeEditComponent,
      HasRoleDirective
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AlertifyService,
    ErrorInterceptorProvider,
    AuthService,
    EmployeeService,
    EmployeeEditResolver,
    EmployeeListResolver,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
