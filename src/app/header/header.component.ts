import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from "angularfire2";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { LoginService } from '../login.service' ;


@Component({
  moduleId: module.id,
  selector: 'boncar-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class HeaderComponent implements OnInit {
  //currentUserAuth : FirebaseAuthState; lets get it from the common login service


  constructor(public af: AngularFire, public loginService: LoginService) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log('Authentication success! (' + auth.provider + ')');
      } else {
        console.log('Logged out! (auth = null)');
      }
      loginService.setUserAuth(auth);
    });
  }

  ngOnInit() {
  }

  loginAnonymous() {
    console.log("Logging in by Anonymous user...");
    this.af.auth.login().then(
      success => console.log('Anonymous login success: ' + success.uid)
    ).catch(
      err => console.log('Anonymous login FAILED: ' + err)
    );
  }

  logoutAnonymous() {
    console.log("Log out Anonymous user...");
    this.af.auth.logout();
    this.loginService.logout();
  }

  loginFacebook() {
    console.log("Logging in Facebook user...");
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      success => console.log('Facbook login success: ' + success.uid)
    ).catch(
      err => console.log('Facbook login FAILED: ' + err)
    );
  }

  logoutFacebook() {
    console.log("Log out Facebook user...");
    this.af.auth.logout();
    this.loginService.logout();
  }

  logoutEmail() {
    console.log("Log out Email user...");
    this.af.auth.logout();
    this.loginService.logout();
  }

}
