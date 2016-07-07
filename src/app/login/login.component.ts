import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from "angularfire2";
import { EmailPasswordCredentials } from "angularfire2/es6/providers/auth_backend";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log('Authentication success, lest nevigate to /user profile page...');
        this.router.navigate(['/user']);
      } else {
        console.log('Logged out! (auth = null)');
      }
    });
  }

  ngOnInit() {
  }


  testR() {
    console.log('Go');
    this.router.navigate(['/user']);
  }

  onLoginForm(formObject) {
    //console.log("***" + formObject.controls.email.value);
    //console.log("***" + formObject.controls.password.value);

    console.log("Logging in email/password user...");

    let c : EmailPasswordCredentials = {
      email : formObject.controls.email.value,
      password: formObject.controls.password.value
    };

    this.af.auth.login(
      c, { provider: AuthProviders.Password, method: AuthMethods.Password }
    ).then(
      success => console.log('Email login success: ' + success)
    ).catch(
      err => console.log('Email login FAILED: ' + err)
    );

  }

}
