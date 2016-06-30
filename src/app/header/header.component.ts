import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";


@Component({
  moduleId: module.id,
  selector: 'boncar-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public af: AngularFire) {}

  ngOnInit() {
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

}
