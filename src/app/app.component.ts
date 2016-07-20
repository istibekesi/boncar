import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {CarComponent} from "./car/car.component";
import {CarService} from "./car/car.service";


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, HeaderComponent, FooterComponent, CarComponent],
  providers : [CarService, AngularFire]
})
export class AppComponent {
  title = 'Hello World!';
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
    this.items = af.database.list('fire/hun');
  }

}
