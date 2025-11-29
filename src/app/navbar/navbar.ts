import { Component, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { LoggedIn } from '../services/logged-in';
import { Api } from '../services/api';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit{
  public isLoggedIn = false;

  constructor(public loggedInService: LoggedIn, public service: Api, public cookie: CookieService) { }

  ngOnInit(): void {
    this.loggedInService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status
    })
    this.getUserInfo()
  }

  public userInfo:any;
  getUserInfo(){  
    this.service.auth().subscribe( (data:any) => {
      this.userInfo = data
    })  
  }

  logOut(){
    this.cookie.delete('user');
    this.loggedInService.updateLoggedInStatus()
  }
}

