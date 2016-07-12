import {Component, OnInit} from '@angular/core';
import {SeatComponent} from './seat.component';

@Component({
  selector: 'boncar-car',
  providers: [],
  template: `
    <div>
    <div class="well clearfix">

      <div class="btn-group">
        <button (click)="removeSeat()" type="button" class="btn btn-success btn-xs"><i class="fa fa-minus" aria-hidden="true"></i>
</button>
        <button (click)="addSeat()" type="button" class="btn btn-success btn-xs"><i class="fa fa-plus" aria-hidden="true"></i>
</button>
      </div>

      <br/><br/>

      <div style="width:300px;height:600px;border-style:solid;border-width:1px;">

        <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            id="svg1" height="100%" width="100%" [attr.viewBox]="viewBox(200)" preserveAspectRatio="xMidYMin">
          <g>
            <defs>
            </defs>

            <rect x="2" y="2" rx="3" ry="3" width="96" [attr.height]="yHeigth(196)" class="car-rect"></rect>
            <rect x="4" y="44" rx="3" ry="3" width="92" [attr.height]="yHeigth(110)" fill="white"></rect>

            <g boncar-seat *ngFor="let s of seats; let i = index"
              [attrX]="seatX(i)" [attrY]="seatY(i)" [svgId]="'svg-id-'+i"></g>


          </g>
        </svg>

    </div>
  </div>
  </div>
  `,
  styles : [`
    .car-rect {
      fill: #2c3e50;
    }
  `],
  directives: [SeatComponent]
})
export class CarComponent implements OnInit {

  name : string;
  seats : Array<number>;

  constructor() {
  }

  ngOnInit() {
    this.name = "inited" ;
    this.seats = [0, 1, 2, 4, 5];
  }

  rows() {
    if (this.seats.length < 3) return 1;
    if (this.seats.length < 6) return 2;
    let extraSeats = (this.seats.length - 5);
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
    this.seats.push(this.seats.length + 1);
  }

  removeSeat() {
    this.seats.pop();
  }

}
