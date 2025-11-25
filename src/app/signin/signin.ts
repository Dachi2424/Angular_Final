import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  constructor(public service: Api) {

  }

  public formInfo = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.minLength(6))
  })

  signInAccount(){
    this.service.signIn(this.formInfo.value).subscribe( (data:any) => {
      console.log(data);
      
    })
  }

}
