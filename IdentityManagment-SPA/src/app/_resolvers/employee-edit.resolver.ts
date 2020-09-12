import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { EmployeeService } from '../_services/employee.service';


@Injectable()
export class EmployeeEditResolver implements Resolve<User[]> {

    constructor(private employeeService: EmployeeService, 
                private alertify: AlertifyService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // tslint:disable-next-line:no-string-literal
    return this.employeeService.getEmployee(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retreiving data');
                this.router.navigate(['/employees']);
                return of(null);
            })
        );
    }
}