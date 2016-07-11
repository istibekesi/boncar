import { Component, OnInit } from '@angular/core';
import { AngularFire }  from 'angularfire2';
import { Ride } from '../ride/model/ride';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']

})
export class WelcomeComponent implements OnInit {

  selectedDay : Date;

  constructor(public af: AngularFire, private router: Router) {
    //this.items = af.database.list('fire/hun');
    this.selectedDay = new Date("2016-07-13");
  }

  ngOnInit() {

  }



  goDate() {this.router.navigate(['/rides', this.selectedDay]);

  }

    /**
     * Pushes a test ride object for the selected day
     */
  testAddRide() {
    let ride = new Ride(
      "driver",
      this.selectedDay,
      [[1, "utas1"],[2, "utas2"]],
      [[1, "utas1", "Hello"],[2, "utas2", "Bello"]]
    );
    let listRides = this.af.database.list('rides/'+this.selectedDay);
    listRides.push(ride);

  }

}
