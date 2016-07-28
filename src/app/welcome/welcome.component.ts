import { Component, OnInit } from '@angular/core';
import { AngularFire }  from 'angularfire2';
import { Ride } from '../ride/model/ride';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { LoginService} from '../login.service' ;

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']

})
export class WelcomeComponent implements OnInit {

  selectedDay : Date;

  constructor(public af: AngularFire, private router: Router, public loginService: LoginService) {
    this.selectedDay = new Date();
  }

  ngOnInit() {

  }



  goDate() {this.router.navigate(['/rides', this.selectedDay]);
  }

  goRides(key) {this.router.navigate(['/rides', key]);
  }

  goMyRide() {
    this.router.navigate(['/ride/2016-07-30/-KNlHdfaME-62xXmUAwO']);
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
