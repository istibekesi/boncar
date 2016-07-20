import {iRide} from "./iride";

export class Ride implements iRide {

  constructor (public fkOwnerUserUid : string,
               public date : Date,
               public passengers : Array<[number, string]>,
               public chat : Array<[number, string, string]>) {

  }
}
