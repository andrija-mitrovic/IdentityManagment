import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee;
  employeeForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private fb: FormBuilder,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employee=data['employee'];
    });
    
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.employeeForm=this.fb.group({
      gender: [this.employee.gender],
      firstName: [this.employee.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.employee.lastName, [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: [this.employee.dateOfBirth, Validators.required],
      phone: [this.employee.phone],
      designation: [this.employee.designation],
      email: [this.employee.email],
      city: [this.employee.city],
      address: [this.employee.address]
    });
  }


  updateEmployee() {
    this.employee=Object.assign({}, this.employeeForm.value);
    console.log(this.employee);
    this.employeeService.updateEmployee(this.route.snapshot.params['id'], this.employee).subscribe(() => {
      this.alertify.success('Successfully updated!');
      this.router.navigate(['/employees'])
    }, error => {
      this.alertify.error(error);
    });
  }
}
