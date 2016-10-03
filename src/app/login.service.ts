/// <reference path="../../typings/globals/underscore/index.d.ts" />
import * as _ from 'underscore';

import { Injectable } from '@angular/core';
import { UserDetail } from "./user-profile/model/user-detail";
import { Subject }    from 'rxjs/Subject';
import {FirebaseAuthState, AngularFire, FirebaseObjectObservable} from "angularfire2";

@Injectable()
export class LoginService {

  userAuth : FirebaseAuthState;
  userDetail : UserDetail;

  userAuthSubject = new Subject<FirebaseAuthState>();
  userAuthObservable = this.userAuthSubject.asObservable();

  udObs : FirebaseObjectObservable<UserDetail>;

  constructor(public af: AngularFire) {

    this.userAuthObservable.subscribe( authChanged => {

      console.log("Auth changed:" + authChanged);

      this.setUserDetail(new UserDetail("","","anonymous"));

      if (this.userAuth)
      {
        this.udObs = this.af.database.object('userDetail/' + this.userAuth.uid);
        this.udObs.subscribe(userDetail => {
          if (userDetail.hasOwnProperty('$value') && !userDetail['$value']) {
            // object does not exist
            console.log("User Details retrieved... details do not exist yet!");

            if (this.userAuth.provider == 2) {
              // Facebook user
              this.setUserDetail(new UserDetail("", this.userAuth.auth.photoURL, this.userAuth.auth.displayName));
            } else if (this.userAuth.provider == 4) {
              // Anonymous or Password
              this.setUserDetail(new UserDetail("","", this.userAuth.auth.email));
            } else {
              this.setUserDetail(new UserDetail("","","anonymous"));
            }
            console.log("Dont exist? Let's save it than!")

            if (this.userAuth.provider != 2) {
              this.initAvatar();
            }

            this.updateUserDetails();

          } else {
            // object exists
            console.log("User Details retrieved... details already exists!");
            console.log(userDetail);
            console.log(authChanged);
            
            this.setUserDetail(userDetail);   // Wow... we should keep firebase aligned to the iUserDetail interface ;)
          }
        });
      }
    });
  }

  updateUserDetails() {
    let avatar = this.userDetail.avatarUrl ? this.userDetail.avatarUrl : "";
    this.udObs.update({ avatarUrl : avatar, alias : this.userDetail.alias });
  }

  initAvatar() {
    this.userDetail.avatarUrl = "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13534613_636974456453550_618068237_n.jpg";
  }

  // dirty hack, should not duplicate the "subject"
  setUserAuth (ua : FirebaseAuthState) {
    this.userAuth = ua;
    this.userAuthSubject.next(ua);
  }

  setUserDetail (ud : UserDetail) {
    this.userDetail = ud;
  }

  logout () {
    this.userAuth = null;
    this.userDetail = null;
    this.userAuthSubject.next(null);
  }

}
