import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CartDetails } from './cart-details/cart-details';
import { Details } from './details/details';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "cart-details", component: CartDetails},
  {path: "details", component: Details},
  {path: "signin", component: Signin},
  {path: "signup", component: Signup},
  {path: "profile", component: Profile},
];
