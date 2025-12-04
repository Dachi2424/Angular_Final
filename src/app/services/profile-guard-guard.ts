import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const profileGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const cookie = inject(CookieService)

  if(cookie.check('user')){
    return true
  } 
  else if(!cookie.check('user')){
    router.navigate(['/'])
    return false
  } 
  else {
    return false
  }

  //returns true if a user is authorized
};
