import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  constructor(public service: Api, public router: Router){

  }

  public formInfo = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    age: new FormControl("", [Validators.required, Validators.pattern(/^1[89]|[2-9][0-9]|1[0-9][0-9]$/)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    address: new FormControl("", Validators.required),
    phone: new FormControl("+995", [Validators.required, Validators.pattern(/^\+9955[0-9]{8}$/)]),
    zipcode: new FormControl("", Validators.required),
    avatar: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required)
  })


  public successMessage!:boolean;
  signUp(){
     this.service.signUp(this.formInfo.value).subscribe({
      next: () => {
        this.successMessage = true
        this.formInfo.disable()
        setTimeout(() => {
          this.router.navigate(['/signin'])
        }, 4000)
      },
      error: () => {
        this.successMessage = false
      }
     })   
  }
}
