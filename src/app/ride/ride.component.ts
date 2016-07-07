import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'boncar-ride',
  template: `
    <div>Hello Ride Component!</div>
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class RideComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
