import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {CarService} from './car.service';
import {NgClass} from '@angular/common';

@Component({
  selector: '[boncar-seat]',
  template: `

    <svg:g>
        <svg:defs>
            <svg:pattern [attr.id]="svgId" patternUnits="objectBoundingBox" width="25" height="25">
                <svg:image [attr.xlink:href]="internalAvatarSrc" x="0" y="0" width="25" height="25" />
            </svg:pattern>
        </svg:defs>

        <svg:rect 
          [attr.x]="attrX" [attr.y]="attrY" rx="1" ry="1" width="25" height="25" 
          class="seat" [ngClass]="{'seat-empty': !internalAvatarSrc}" 
          [attr.fill]="getFillUrl()">
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
    .seat-empty:hover {
      stroke:  #18bc9c;
    }
  `],
  directives: [],
  providers: []
})
export class SeatComponent implements OnInit, OnChanges {
  @Input() attrX: number;
  @Input() attrY: number;
  @Input() svgId: string;

  @Input() avatarSrc : string;
  internalAvatarSrc: string;

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

}
