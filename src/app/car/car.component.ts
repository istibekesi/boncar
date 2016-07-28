import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {SeatComponent} from './seat.component';

@Component({
  moduleId: module.id,
  selector: 'boncar-car',
  providers: [],
  templateUrl: 'car.component.html',
  styles : [`
    .car-rect {
      fill: #2c3e50;
    }
  `],
  directives: [SeatComponent]
})
export class CarComponent implements OnChanges {

  @Input() passengers : Array<any>;
  internalPassengers;

  constructor() {

  }

/*
  ngOnInit() {
    console.log("NgInit of CAR Component!")
    this.internalPassengers = [
      [0, "", ""],
      [1, "", ""],
      [2, "", ""],
      [3, "", ""],
      [4, "", ""]
    ];
  }
*/

  ngOnChanges(changes:any):void {
    console.log("NgOnChanges of CAR Component!")
    console.log(changes.passengers.currentValue);
    if (changes.passengers.currentValue) {
      this.internalPassengers = changes.passengers.currentValue;
    } else {
      this.internalPassengers = [[0,"",""]];
    }
  }

  rows() {
    if (this.internalPassengers.length < 3) return 1;
    if (this.internalPassengers.length < 6) return 2;
    let extraSeats = (this.internalPassengers.length - 5);
    return 2 + (1 + Math.floor((extraSeats - 1) / 2));
  }

  yHeigth(min : number) {
    if (this.rows() < 3) return min;
    return (min + (this.rows() - 2) * 45 );
  }

  viewBox (min : number) {
    return '0 0 100 ' + this.yHeigth(min);
  }

  seatX(i : number) {
    if (i == 0) return 18; if (i == 1) return 58;
    if (i == 2) return 7; if (i == 3) return 37; if (i == 4) return 67;
    if ( i % 2 == 0 ) return 58;
    return 18;
  }

  seatY(i : number) {
    if (i < 2) return 64;
    if (i < 5) return 109;
    let extraRow = 1 + Math.floor((i - 5) / 2) ;
    //console.log('extraRow for ' + i + ' ' + extraRow);
    return 109 + (extraRow * 45);
  }

  addSeat() {
    this.internalPassengers.push([this.internalPassengers.length, "", ""]);
  }

  removeSeat() {
    this.internalPassengers.pop();
  }

}
