import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'boncar-ride-list',
  template: `
    <div>
      <h1>
      Rides
      <small *ngIf="selectedDate">{{selectedDate | date:"yy-MM-dd"}}</small>
      <small *ngIf="!selectedDate">unpcoming</small>
      </h1>
      <br/>

      
      
      
      <!-- should not be shown, instead upcoming should be used -->
      <table class="table table-striped table-hover " *ngIf="selectedDate">
        <thead>
          <tr>
            <th>#</th>
            <th>uid</th>
            <th>Driver</th>
            <th>Go</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let ride of rides | async">
            <td>#</td>
            <td>{{ride?.$key}}</td>
            <td>{{ride?.fkOwnerUserUid}}</td>
            <td><a (click)="goRide(ride.$key)" class="btn btn-info btn-sm">Go</a></td>
          </tr>
        </tbody>
      </table>
      
    </div>
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class RideListComponent implements OnInit {

  selectedDate : Date;
  rides : any;

  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let daySelector = params['day'];
      if (daySelector == 'today' || daySelector == 'tomorrow' || daySelector == 'upcoming' ) {
        //
      } else {
        this.selectedDate = params['day'];
        this.rides = this.af.database.list('rides/'+this.selectedDate);
      }

    });
  }

  goRide(rideId : string) {
    this.router.navigate(['/ride', this.selectedDate, rideId]);
  }

}
