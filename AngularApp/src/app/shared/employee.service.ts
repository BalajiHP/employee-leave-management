import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Employee } from './employee.model';



@Injectable()
export class EmployeeService {
  employees: Employee[];
  readonly baseURL = 'http://localhost:3000/employees';
  selectedEmployee : Employee|{} = {};
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

@Injectable()
export class UserService{
  
  constructor(private _http:HttpClient) { }

  register(body:any){
  return this._http.post('http://127.0.0.1:3000/user/register', body,{
    observe:'body',
    headers:new HttpHeaders().append('Content-Type','application/json')
  });
  }
}