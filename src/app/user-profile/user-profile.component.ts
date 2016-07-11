import { Component, OnInit } from '@angular/core';
import {FirebaseAuthState, AngularFire} from "angularfire2";
import { UserDetail } from "../user-profile/model/user-detail";

@Component({
  moduleId: module.id,
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUserAuth : FirebaseAuthState;

  ud : UserDetail;

  constructor(public af: AngularFire) {

    this.ud = new UserDetail("1","2","3");

    this.af.auth.subscribe(auth => {
      console.log('Authentication changed!');
      this.currentUserAuth = auth;
    });
  }

  ngOnInit() {
  }

}
