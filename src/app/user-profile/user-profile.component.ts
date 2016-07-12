import { Component, OnInit } from '@angular/core';
import {FirebaseAuthState, AngularFire, FirebaseObjectObservable} from "angularfire2";
import { UserDetail } from "../user-profile/model/user-detail";
import { CarService } from "../car/car.service"

@Component({
  moduleId: module.id,
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css'],
  providers : [CarService]
})
export class UserProfileComponent implements OnInit {

  currentUserAuth : FirebaseAuthState;

  udObs : FirebaseObjectObservable<UserDetail>;
  ud : UserDetail;

  constructor(public af: AngularFire, public cs : CarService) {

    this.ud = new UserDetail("","","anonymous");

    this.af.auth.subscribe(auth => {
      this.currentUserAuth = auth;

      if (this.currentUserAuth) {
        console.log('Lets GET details for : ' + this.currentUserAuth.uid);
        this.udObs = this.af.database.object('userDetail/' + this.currentUserAuth.uid);

        this.udObs.subscribe(userDetail => {

          if (userDetail.hasOwnProperty('$value') && !userDetail['$value']) {
            // object does not exist
            console.log("User Details retrieved... details do not exist yet!");

            if (this.currentUserAuth.provider == 2) {
              // Facebook user
              this.ud = new UserDetail("",this.currentUserAuth.auth.photoURL, this.currentUserAuth.auth.displayName);

              // Try to persist the user details
              // this.udObs.update({ avatarUrl : this.currentUserAuth.auth.photoURL, alias : this.currentUserAuth.auth.displayName });

            } else if (this.currentUserAuth.provider == 4) {
              // Anonymous or Password
              this.ud = new UserDetail("","", this.currentUserAuth.auth.email);
            } else {
              this.ud = new UserDetail("","","anonymous");
            }

            console.log("Dont exist? Let's save it than!")
            this.updateUserDetails();

          } else {
            // object exists
            console.log("User Details retrieved... details already exists!");
            this.ud = userDetail;   // Wow... we should keep firebase aligned to the iUserDetail interface ;)
          }

        });

      } else {
        console.log('Logged out...');
      }

    });
  }

  ngOnInit() {
  }

  updateUserDetails() {
    let avatar = this.ud.avatarUrl ? this.ud.avatarUrl : "";
    this.udObs.update({ avatarUrl : avatar, alias : this.ud.alias });
  }

  randomAvatar() {
    this.ud.avatarUrl = this.cs.getRandomInstaAvatar().src;

  }

}
