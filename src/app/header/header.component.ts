import { Component, OnInit } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";


@Component({
  moduleId: module.id,
  selector: 'boncar-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public af: AngularFire) {}

  ngOnInit() {
  }

  loginAnonymous() {
    console.log("Logging in by Anonymous user...");
    this.af.auth.login();
  }

  logoutAnonymous() {
    console.log("Log out Anonymous user...");
    this.af.auth.logout();
  }

  loginFacebook() {
    console.log("Logging in Facebook user...");
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  }

  logoutFacebook() {
    console.log("Log out Facebook user...");
    this.af.auth.logout();
  }

}
