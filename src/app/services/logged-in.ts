import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class LoggedIn {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private cookie: CookieService){
    const initialStatus = this.cookie.check('user');
    this.loggedInSubject = new BehaviorSubject<boolean>(initialStatus);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }
  
  updateLoggedInStatus() {
    const status = this.cookie.check('user');
    this.loggedInSubject.next(status);
  }
}