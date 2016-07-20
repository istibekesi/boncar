import { provideRouter, RouterConfig } from '@angular/router';
import {CarComponent} from "./car/car.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {LoginComponent} from "./login/login.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SingupComponent} from "./login/singup/singup.component";
import {RideListComponent} from "./ride/ride-list.component";
import {RideComponent} from "./ride/ride.component";

export const routes: RouterConfig = [
  { path: '', component: WelcomeComponent},
  { path: 'car', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'rides/:day', component: RideListComponent },
  { path: 'ride/:day/:rideid', component: RideComponent }
];

export const BONCAR_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
