import {iUserDetail} from "./iuser-detail";

export class UserDetail implements iUserDetail {

  constructor (public uuid : string,
               public avatarUrl : string,
               public alias : string) {

  }
}
