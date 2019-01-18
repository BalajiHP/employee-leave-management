import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  user;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.userData();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      designation: "",
      from: "",
      to: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        alert("Submitted succesfully");
        this.userData();
        console.log(res);
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        alert("Edited succesfully");
        
        this.userData();
      });
    }
  }


  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  userData(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.user = res;
    });
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.resetForm(form);
        this.userData();
      });
    }
  }

}
