import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  
  constructor(private employeeService: EmployeeService, 
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employees=data['employees'];
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.delete(id).subscribe(()=> {
      this.alertify.success('Successfully deleted!');
      this.employees.splice(this.employees.findIndex(p=>p.id===id), 1);
    }, error => {
      this.alertify.error(error);
    });
  }
}
