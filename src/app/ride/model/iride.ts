export interface iRide {

  fkOwnerUserUid : string;
  date : Date;
  passengers: Array<[number, string]>;    // iPassenger? Use "tuple" for now

  //chat: Array<[number, string, string]>;  // iChat? use "tuple" for now
  chat: any;  

  toHour: number;
  toMin: number;
  backHour: number;
  backMin: number;

}
