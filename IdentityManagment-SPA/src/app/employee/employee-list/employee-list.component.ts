import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  
  constructor(private employeeService: EmployeeService, 
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees=employees;
    }, error => {
      this.alertify.error(error);
    });
  }
}
