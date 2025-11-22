import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CartDetails } from './cart-details/cart-details';
import { Details } from './details/details';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "cart-details", component: CartDetails},
  {path: "details", component: Details},
];
