/// <reference path="../../../typings/globals/underscore/index.d.ts" />
import * as _ from 'underscore';

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Ride } from '../ride/model/ride';
import { LoginService} from '../login.service' ;
import { DatePipe } from '@angular/common';



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
      
      <div *ngIf="!selectedDate">
        <div>
          <button type="button" class="btn btn-success btn-sm pull-right" (click)="addRide('today')"><i class="fa fa-car"></i></button>
          <h3>Today</h3>
          <hr/>
          <h3><small>No rides</small></h3>
          {{ dayRideList | json}}
        </div>
        <div>
          <button type="button" class="btn btn-success btn-sm pull-right" (click)="addRide('tomorrow')"><i class="fa fa-car"></i></button>
          <h3>Tomorrow</h3>
          <hr/>
          <h3><small>No rides</small></h3>
        </div>
          <button type="button" class="btn btn-success btn-sm pull-right" (click)="addRide('upcoming')"><i class="fa fa-car"></i></button>
          <h3>Upcoming</h3>
          <hr/>
          <h3><small>No rides</small></h3>
        <div>
        
        </div>
      </div>
      
    </div>
  `,
  directives: [ ROUTER_DIRECTIVES ],
  providers: [DatePipe]
})
export class RideListComponent implements OnInit {

  selectedDate : Date;
  rides : any;

  dayRideListObs : any;
  dayRideList;

  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire, public loginService: LoginService, private datePipe: DatePipe) {
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      let daySelector = params['day'];
      if (daySelector == 'today' || daySelector == 'tomorrow' || daySelector == 'upcoming' ) {

        this.dayRideListObs = this.af.database.list('rides');

        this.dayRideListObs.subscribe( dayRideList => {
          this.dayRideList = dayRideList;
        });

        console.log('**** 3 ? ' + _.size({one: 1, two: 2, three: 3}) );

      } else {
        // should not be used
        this.selectedDate = params['day'];
        this.rides = this.af.database.list('rides/'+this.selectedDate);
      }

    });
  }

  goRide(rideId : string) {
    this.router.navigate(['/ride', this.selectedDate, rideId]);
  }

  addRide(key : string) {

    let today : Date = new Date();
    let tomorrow : Date = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    let tomorrow2 : Date = new Date(); tomorrow2.setDate(tomorrow2.getDate() + 2);

    let targetDay : Date = today;
    if (key == 'tomorrow') targetDay = tomorrow;
    if (key == 'upcoming') targetDay = tomorrow2;

    let ride = new Ride(
      this.loginService.userAuth.uid,
      targetDay,
      [[1, this.loginService.userAuth.uid]],
      [[1, this.loginService.userAuth.uid, 'AutoMessage: Let me offered my ride!' ]]
    );
    let listRides = this.af.database.list('rides/'+this.datePipe.transform(targetDay, 'yyyy-MM-dd'));
    listRides.push(ride);


  }

}
