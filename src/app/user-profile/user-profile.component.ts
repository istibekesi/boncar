import { Component, OnInit } from '@angular/core';
import {FirebaseAuthState, AngularFire} from "angularfire2";

@Component({
  moduleId: module.id,
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUserAuth : FirebaseAuthState;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      console.log('Authentication changed!');
      this.currentUserAuth = auth;
    });
  }

  ngOnInit() {
  }

}
