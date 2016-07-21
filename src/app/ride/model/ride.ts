import {iRide} from "./iride";

export class Ride implements iRide {

  toHour = 8;
  toMin = 0;
  backHour = 17;
  backMin = 0;

  constructor (public fkOwnerUserUid : string,
               public date : Date,
               public passengers : Array<[number, string]>,
               public chat : any) {
  }
}
