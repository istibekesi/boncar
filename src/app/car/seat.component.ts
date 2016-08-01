import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {CarService} from './car.service';
import {NgClass} from '@angular/common';

@Component({
  selector: '[boncar-seat]',
  template: `

    <svg:g [ngClass]="{'seat-empty': !internalAvatarSrc}" (click)="bookTheSeat()" >
        <svg:defs>
            <svg:pattern [attr.id]="svgId" patternUnits="objectBoundingBox" width="25" height="25">
                <svg:image [attr.xlink:href]="internalAvatarSrc" x="0" y="0" width="25" height="25" />
            </svg:pattern>
        </svg:defs>

        <svg:rect 
          [attr.x]="attrX" [attr.y]="attrY" rx="1" ry="1" width="25" height="25" 
          class="seat" 
          [attr.fill]="getFillUrl()">
        </svg:rect>

        <svg:rect *ngIf="!internalAvatarSrc"
          [attr.x]="attrX+5" [attr.y]="attrY+12" rx="1" ry="1" width="15" height="1" 
          class="seat-plus-1" >
        </svg:rect>

        <svg:rect *ngIf="!internalAvatarSrc"
          [attr.x]="attrX+12" [attr.y]="attrY+5" rx="1" ry="1" width="1" height="15" 
          class="seat-plus-2">
        </svg:rect>


    </svg:g>

  `,
  styles : [`
    .seat {
      stroke: #2c3e50;
      stroke-width:2;
      
      -webkit-transition: stroke .5s; /* For Safari 3.1 to 6.0 */
      transition: stroke .5s;
    }

    .seat-empty {
      cursor: pointer;
    }
    .seat-plus-1 {
      stroke: #2c3e50;
      stroke-width:1;
      cursor: pointer;

      -webkit-transition: stroke 1s, stroke-width 1s; /* For Safari 3.1 to 6.0 */
      transition: stroke 1s, stroke-width 1s;
    }
    .seat-plus-2 {
      stroke: #2c3e50;
      stroke-width:1;
      cursor: pointer;

      -webkit-transition: stroke 1s, stroke-width 1s; /* For Safari 3.1 to 6.0 */
      transition: stroke 1s, stroke-width 1s;
    }

    .seat-empty:hover > .seat-plus-1 {
      stroke:  #18bc9c;
      stroke-width:2;
    }
    .seat-empty:hover > .seat-plus-2 {
      stroke:  #18bc9c;
      stroke-width:2;
    }

  `],
  directives: [],
  providers: []
})
export class SeatComponent implements OnInit, OnChanges {
  @Input() attrX: number;
  @Input() attrY: number;
  @Input() svgId: string;
  @Input() position: number;

  @Input() avatarSrc : string;
  internalAvatarSrc: string;

  @Output() bookSeatRequest = new EventEmitter();

  constructor(private carService:CarService) {
    //let avatar = this.carService.getRandomInstaAvatar();
    //this.avatarSrc = avatar.src;
  }

  ngOnChanges(changes:any):void {
    //console.log("***" + changes.avatarSrc.currentValue);
    this.internalAvatarSrc = changes.avatarSrc.currentValue;
  }

  

  getFillUrl() : string {
    return `url(#${this.svgId})`;
  }


  ngOnInit() {
  }

  bookTheSeat() {
    if (this.internalAvatarSrc) {
      console.log("Unable to book this seat, reserved already!");
      return;
    }
    console.log("SEAT EMIT:" + this.position);
    this.bookSeatRequest.emit({
      value: this.position
    });
  }

}
