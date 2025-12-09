import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';
import { Checkout } from './checkout/checkout';
import { profileGuardGuard } from './services/profile-guard-guard';
import { NotFoundPage } from './not-found-page/not-found-page';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "details", component: Details},
  {path: "signin", component: Signin},
  {path: "signup", component: Signup},
  {path: "profile", component: Profile, canActivate: [profileGuardGuard]},
  {path: "checkout", component: Checkout},
  {path: "**", component: NotFoundPage},
];
