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
  templateUrl: 'ride-list.component.html',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [DatePipe]
})
export class RideListComponent implements OnInit {

  selectedDate : Date;
  rides : any;

  dayRideListObs : any;
  dayRideList;

  flatDayRides : Array<[string, string, number, number, number, number]> = [];


  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire, public loginService: LoginService, private datePipe: DatePipe) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      let daySelector = params['day'];
      if (daySelector == 'today' || daySelector == 'tomorrow' || daySelector == 'upcoming' ) {

        this.dayRideListObs = this.af.database.list('rides');

        this.dayRideListObs.subscribe( dayRideList => {

          // Todo : somehow limit this query...
          this.dayRideList = dayRideList;
          this.flattenDayRides();
        });

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

    // TODO: makes troubel if user is not logged in!

    let ride = new Ride(
      this.loginService.userAuth.uid,
      targetDay,
      [[0, this.loginService.userAuth.uid, this.loginService.userDetail.avatarUrl],
      [1, "", ""], [2, "", ""], [3, "", ""], [4, "", ""]],
      //[[0, this.loginService.userAuth.uid, 'AutoMessage: Let me offered my ride!' ]]
      { '-0' : 
        {
          'id' : 0, 
          'userId' : this.loginService.userAuth.uid, 
          'msg' : 'AutoMessage: Let me offered my ride!'
        }
      }
    );
    let listRides = this.af.database.list('rides/'+this.datePipe.transform(targetDay, 'yyyy-MM-dd'));
    listRides.push(ride);
  }


  /**
   * Processes the day-ride list and creates a flat datamodel
   */
  flattenDayRides() {

    console.log("Lets flatten day rides...");

    this.flatDayRides = [];
    _.each(this.dayRideList, dayRide => {

      let day : string = dayRide['$key'];
      let keysOfDayRide = _.keys(dayRide);

      _.each(keysOfDayRide, k => {
        if( k && k != '$key') {
          this.flatDayRides.push([day, k, dayRide[k].toHour, dayRide[k].toMin, dayRide[k].backHour, dayRide[k].backMin]);
        }
      });

      } 
    );

    console.log("Flatten done... number of rides: " + this.flatDayRides.length);

  }

  // todo : learn and implement a custom PIPE instead of such an ugly getters!!!
  getRidesToday() : any  {
    let today : Date = new Date();
    return _.filter(this.flatDayRides, r => {
      return this.datePipe.transform(today, 'yyyy-MM-dd') == r[0];
    } );
  }

  getRidesTomorrow() : any  {
    let today : Date = new Date();
    let tomorrow : Date = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    return _.filter(this.flatDayRides, r => {
      return this.datePipe.transform(tomorrow, 'yyyy-MM-dd') == r[0];
    } );
  }

  getRidesUpcoming() : any {
    let today : Date = new Date();
    let tomorrow : Date = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    return _.filter(this.flatDayRides, r => {
      return this.datePipe.transform(today, 'yyyy-MM-dd') != r[0] && this.datePipe.transform(tomorrow, 'yyyy-MM-dd') != r[0];
    } );
  }

}
