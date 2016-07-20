import { Component, OnInit } from '@angular/core';
import {FirebaseAuthState, AngularFire, FirebaseObjectObservable} from "angularfire2";
import { UserDetail } from "../user-profile/model/user-detail";
import { CarService } from "../car/car.service";
import { LoginService } from '../login.service' ;

@Component({
  moduleId: module.id,
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css'],
  providers : [CarService]
})
export class UserProfileComponent implements OnInit {

  //udObs : FirebaseObjectObservable<UserDetail>;

  constructor(public af: AngularFire, public cs : CarService, public loginService : LoginService) {
  }

  ngOnInit() {}

    /*
    this.loginService.userAuthObservable.subscribe( authChanged => {


      if (authChanged) {

        this.loginService.setUserDetail(new UserDetail("","","anonymous"));
        this.udObs = this.af.database.object('userDetail/' + this.loginService.userAuth.uid);
        this.udObs.subscribe(userDetail => {
          if (userDetail.hasOwnProperty('$value') && !userDetail['$value']) {
            // object does not exist
            console.log("User Details retrieved... details do not exist yet!");

            if (this.loginService.userAuth.provider == 2) {
              // Facebook user
              this.loginService.setUserDetail(new UserDetail("", this.loginService.userAuth.auth.photoURL, this.loginService.userAuth.auth.displayName));
            } else if (this.loginService.userAuth.provider == 4) {
              // Anonymous or Password
              this.loginService.setUserDetail(new UserDetail("","", this.loginService.userAuth.auth.email));
            } else {
              this.loginService.setUserDetail(new UserDetail("","","anonymous"));
            }
            console.log("Dont exist? Let's save it than!")
            this.updateUserDetails();

          } else {
            // object exists
            console.log("User Details retrieved... details already exists!");
            this.loginService.setUserDetail(userDetail);   // Wow... we should keep firebase aligned to the iUserDetail interface ;)
          }
        });
      }

    });


    this.loginService.setUserDetail(new UserDetail("","","anonymous"));
    this.udObs = this.af.database.object('userDetail/' + this.loginService.userAuth.uid);
    this.udObs.subscribe(userDetail => {
      if (userDetail.hasOwnProperty('$value') && !userDetail['$value']) {
        // object does not exist
        console.log("User Details retrieved... details do not exist yet!");

        if (this.loginService.userAuth.provider == 2) {
          // Facebook user
          this.loginService.setUserDetail(new UserDetail("", this.loginService.userAuth.auth.photoURL, this.loginService.userAuth.auth.displayName));
        } else if (this.loginService.userAuth.provider == 4) {
          // Anonymous or Password
          this.loginService.setUserDetail(new UserDetail("","", this.loginService.userAuth.auth.email));
        } else {
          this.loginService.setUserDetail(new UserDetail("","","anonymous"));
        }
        console.log("Dont exist? Let's save it than!")
        this.updateUserDetails();

      } else {
        // object exists
        console.log("User Details retrieved... details already exists!");
        this.loginService.setUserDetail(userDetail);   // Wow... we should keep firebase aligned to the iUserDetail interface ;)
      }
    });

*//*
  }
  updateUserDetails() {
    let avatar = this.loginService.userDetail.avatarUrl ? this.loginService.userDetail.avatarUrl : "";
    this.udObs.update({ avatarUrl : avatar, alias : this.loginService.userDetail.alias });
  }*/

  randomAvatar() {
    this.loginService.userDetail.avatarUrl = this.cs.getNewRandomInstaAvatar(this.loginService.userDetail.avatarUrl).src;
  }

}
