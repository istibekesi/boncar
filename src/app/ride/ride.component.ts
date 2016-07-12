import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CarComponent } from '../car/car.component';

@Component({
  moduleId: module.id,
  selector: 'boncar-ride',
  template: `
    <h3>Hello Ride Component!</h3>

    <div class="row" style="padding-top:40px"></div>

    <div class="row">
      <div class="col-sm-4">
        <boncar-car></boncar-car>
      </div>

      <div class="col-sm-8">
        here comes the details and the chat
      </div>
    </div>

    <!--
    {{  rideObs | async }}*<br/>
    {{ (rideObs | async)?.fkOwnerUserUid }}*<br/>
    {{ (rideObs | async)?.chat | json }}*<br/>
    -->

  `,
  directives: [ ROUTER_DIRECTIVES, CarComponent ]
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
