import { Component, OnInit } from '@angular/core';
import { AngularFire }  from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css']

})
export class WelcomeComponent implements OnInit {

  selectedDay : any;

  constructor(public af: AngularFire) {
    //this.items = af.database.list('fire/hun');
  }

  ngOnInit() {
  }

  testAddRide() {
    let listRides = this.af.database.list('rides');
    listRides.update( this.selectedDay, {
      'heyho' : 'firesocool'
    });

  }

}
