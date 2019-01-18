import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	
	registerForm:FormGroup = new FormGroup({
		email:new FormControll(null,  )
	})
  constructor(private _router:Router) { }

  ngOnInit() {
  }

  moveToLogin(){
  	this._router.navigate(['/login']);
  }

}
