import { Component, OnInit } from '@angular/core';
import { AngularFire }  from 'angularfire2';
import { Ride } from '../ride/model/ride';

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']

})
export class WelcomeComponent implements OnInit {

  selectedDay : Date;

  constructor(public af: AngularFire) {
    //this.items = af.database.list('fire/hun');
  }

  ngOnInit() {
  }





  testAddRide() {
    let ride = new Ride(
      "driver",
      this.selectedDay,
      [[1, "utas1"],[2, "utas2"]],
      [[1, "utas1", "Hello"],[2, "utas2", "Bello"]]
    );
    let listRides = this.af.database.list('rides');
    listRides.update( this.selectedDay, ride);
  }

}
