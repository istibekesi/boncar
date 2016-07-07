import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'boncar-ride-list',
  template: `
    <div>
      <h3>Hello Rides List!</h3>
      Selected date: {{selectedDate}}
    </div>
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class RideListComponent implements OnInit {

  selectedDate : Date;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedDate = params['day'];
    });
  }

}
