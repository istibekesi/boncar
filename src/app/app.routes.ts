import { provideRouter, RouterConfig } from '@angular/router';
import {CarComponent} from "./car/car.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./login/login.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SingupComponent} from "./login/singup/singup.component";

export const routes: RouterConfig = [
  { path: '', component: WelcomeComponent},
  { path: 'car', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'user/:id', component: UserProfileComponent }
];

export const BONCAR_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
