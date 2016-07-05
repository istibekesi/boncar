import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from "angularfire2";
import {EmailPasswordCredentials} from "angularfire2/es6/providers/auth_backend";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
  }

  onLoginFormSubmit(formObject) {
    //console.log("***" + formObject.controls.email.value);
    //console.log("***" + formObject.controls.password.value);

    console.log("Logging in email/password user...");

    /*
    this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    }).then(
      success => console.log('Email login success: ' + success)
    ).catch(
      err => console.log('Email login FAILED: ' + err)
    );
    */

    let c : EmailPasswordCredentials = {
      email : formObject.controls.email.value,
      password: formObject.controls.password.value
    };

    this.af.auth.login(
      c
    ).then(
      success => console.log('Email login success: ' + success)
    ).catch(
      err => console.log('Email login FAILED: ' + err)
    );

  }

}
