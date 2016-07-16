import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  testObject : any;

  constructor() {
    this.testObject = {
      c : 10
    };
  }

  plus () {
    this.testObject.c++;
  }

  minus () {
    this.testObject.c--;
  }


}
