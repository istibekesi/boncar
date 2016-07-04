import { provideRouter, RouterConfig } from '@angular/router';
import {CarComponent} from "./car/car.component";
import {WelcomeComponent} from "./welcome/welcome.component";

export const routes: RouterConfig = [
  { path: '', component: WelcomeComponent}, 
  { path: 'car', component: CarComponent }
//  { path: 'login', component: LoginComponent },
//  { path: 'user/:id', component: UserComponent }
];

export const BONCAR_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
