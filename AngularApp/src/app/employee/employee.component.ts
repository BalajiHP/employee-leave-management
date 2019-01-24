import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { UserService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  empl;

  constructor(private employeeService: EmployeeService, private _userservice: UserService, private _router:Router) {
    this._userservice.user()
    .subscribe(
      data=>console.log(data),
      error=>this._router.navigate(['/login'])
      )
  }

  ngOnInit() {
    this.userData();
    this.resetForm();
  }

  logout(){
    this._userservice.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
      )
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
      this.empl = res;
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
