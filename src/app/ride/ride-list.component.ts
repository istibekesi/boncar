import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'boncar-ride-list',
  template: `
    <div>
      <h3>Hello Rides List!</h3>
      Selected date: {{selectedDate}}
      <br/><br/><br/>
      
      
      <table class="table table-striped table-hover ">
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
      
      <!--
      <ul *ngFor="let ride of rides | async">
        <li class="text">
          {{ride?.$key}} : {{ride?.fkOwnerUserUid}}
        </li>
      </ul>
      -->
      
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
      this.selectedDate = params['day'];
      this.rides = this.af.database.list('rides/'+this.selectedDate);
    });
  }

  goRide(rideId : string) {
    this.router.navigate(['/ride', rideId]);
  }

}
