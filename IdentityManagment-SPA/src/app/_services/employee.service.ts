import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
baseUrl=environment.apiUrl;

constructor(private http: HttpClient) { }

getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.baseUrl+'employee');
}

getEmployee(id): Observable<Employee> {
  return this.http.get<Employee>(this.baseUrl+'employee/'+id);
}

createEmployee(employee: Employee) {
  return this.http.post(this.baseUrl+'employee', employee);
}

updateEmployee(id: number, employee: Employee) {
  return this.http.put(this.baseUrl+'employee/'+id, employee);
}

delete(id: number) {
  return this.http.delete(this.baseUrl+'employee/'+id);
}
}
