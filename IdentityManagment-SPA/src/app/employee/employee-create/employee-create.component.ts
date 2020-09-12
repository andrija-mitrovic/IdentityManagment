import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;

  constructor(private employeeService: EmployeeService, 
              private alertify: AlertifyService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.employeeForm=this.fb.group({
      gender: ['male'],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', Validators.required],
      phone: [''],
      designation: [''],
      email: [''],
      city: [''],
      address: ['']
    });
  }

  createEmployee() {
    if(this.employeeForm.valid) {
      this.employee=Object.assign({}, this.employeeForm.value);
      this.employeeService.createEmployee(this.employee).subscribe(()=> {
        this.alertify.success('Creation successgul');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/employees']);
      });
    }
  }

}
