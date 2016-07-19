import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from "angularfire2";
import { UserDetail } from "./user-profile/model/user-detail";
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LoginService {

  userAuth : FirebaseAuthState;
  userDetail : UserDetail;

  userAuthSubject = new Subject<FirebaseAuthState>();
  userAuthObservable = this.userAuthSubject.asObservable();

  constructor() {

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
