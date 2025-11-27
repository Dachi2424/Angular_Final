import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoggedIn } from '../services/logged-in';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  constructor(public loggedInService: LoggedIn, public service: Api, private cookie: CookieService, public router: Router) {

  }

  public formInfo = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  public success!: boolean;
  public authorized: boolean = false
  signInAccount(){
    this.service.signIn(this.formInfo.value).subscribe({
      next: (data:any) => {
        this.cookie.set('user', data.access_token);
        this.loggedInService.updateLoggedInStatus();
        this.success = true
        setTimeout(() => {
          this.authorized = true;
          this.router.navigate(['/']);
        }, 3000)
      },
      error: (err) => {
        this.success = false;
      }
    })
  }

}
