import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'boncar-ride',
  template: `
    <div>Hello Ride Component!</div>
    
    {{  ride | async }}*<br/>
    {{ (ride | async)?.fkOwnerUserUid }}*<br/>
    {{ (ride | async)?.chat | json }}*<br/>
    
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class RideComponent implements OnInit {

  rideId : string;
  ride : any;
  day : Date;

  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = params['day'];
      this.rideId = params['rideid'];
      this.ride = this.af.database.object('rides/' + this.day + '/' + this.rideId );
    });
  }

}
