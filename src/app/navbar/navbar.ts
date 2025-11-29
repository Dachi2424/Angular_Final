import { Component, ElementRef, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
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

  constructor(public loggedInService: LoggedIn, public service: Api, public cookie: CookieService, public router: Router, private renderer: Renderer2) { }

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
    let answer = confirm("are you sure you want to log out?")
    if(answer){
      this.cookie.delete('user');
      this.loggedInService.updateLoggedInStatus()
      this.router.navigate(['/'])
    }
  }

  @ViewChild('menu') menuDiv!: ElementRef
  showMenu(){
    this.renderer.addClass(this.menuDiv.nativeElement, 'header__mobile-menu--active')
  }
  hideMenu(){
    this.renderer.removeClass(this.menuDiv.nativeElement, 'header__mobile-menu--active')
  }
}

