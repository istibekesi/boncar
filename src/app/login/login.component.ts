import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class LoginComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  onLoginFormSubmit(formObject) {
    console.log(formObject);
  }

}
