import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from "angularfire2";
import { EmailPasswordCredentials } from "angularfire2/es6/providers/auth_backend";

@Component({
  moduleId: module.id,
  selector: 'app-singup',
  templateUrl: 'singup.component.html',
  styleUrls: ['singup.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class SingupComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log('Authentication success, lest navigate to /user profile page...');
        this.router.navigate(['/user']);
      } else {
        console.log('Logged out! (auth = null)');
      }
    });
  }

  ngOnInit() {
  }


  onSignForm(formObject) {
    //console.log("***" + formObject.controls.email.value);
    //console.log("***" + formObject.controls.password.value);

    console.log("Signing up in email/password user...");

    let c : EmailPasswordCredentials = {
      email : formObject.controls.email.value,
      password: formObject.controls.password.value
    };

    this.af.auth.createUser(
      c //, { provider: AuthProviders.Password, method: AuthMethods.Password }
    ).then(
      success => console.log('Sign up success: ' + success)
    ).catch(
      err => console.log('sign up FAILED: ' + err)
    );

  }
}
