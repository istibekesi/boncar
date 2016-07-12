import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'boncar-ride',
  template: `
    <div>Hello Ride Component!</div>
    
    {{  rideObs | async }}*<br/>
    {{ (rideObs | async)?.fkOwnerUserUid }}*<br/>
    {{ (rideObs | async)?.chat | json }}*<br/>
    
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class RideComponent implements OnInit {

  rideId : string;
  rideObs : FirebaseObjectObservable<any>;
  day : Date;

  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = params['day'];
      this.rideId = params['rideid'];
      this.rideObs = this.af.database.object('rides/' + this.day + '/' + this.rideId );
    });
  }

}
