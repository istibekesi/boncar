import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CarComponent } from '../car/car.component';
import { Observable }    from 'rxjs/Observable';
import { LoginService} from '../login.service' ;
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'boncar-ride',
  template: `

    <div class="row" style="padding-top:10px"></div>

    <div class="row">
      <div class="col-sm-4">
        <boncar-car [passengers]="ride?.passengers"></boncar-car>
      </div>

      <div class="col-sm-8">
        <h3>Ride on {{day}}</h3>


        <br/>

        {{ride | json}}


        <h3>Messages</h3>
        <hr/>
        <div *ngFor="let chatEntry of chatEntries">
            <img class="img-circle pull-left" [src]="chatEntry.newsht?.avatarUrl" heigth="52" width="52" style="margin:0 15px">
            <p class="text-muted" style="margin:0 0 5px">{{chatEntry.newsht?.alias}}&nbsp;</p>
            {{chatEntry.msg}}
            <hr/>
        </div>

        <div *ngIf="loginService.userAuth">
            <img class="img-circle pull-left" [src]="loginService.userDetail?.avatarUrl" heigth="52" width="52" style="margin:0 15px">
            <p class="text-muted" style="margin:0 0 5px">{{loginService.userDetail?.alias}}&nbsp;</p>

            <div class="form-group">
              <div class="input-group input-group-sm" >
                <input type="text" class="form-control" [(ngModel)]="msg">
                <span class="input-group-btn">
                  <button class="btn btn-primary" (click)="postChat()" type="button">Send</button>
                </span>
              </div>
            </div>

        </div>

      </div>

    </div>
  `,
  directives: [ ROUTER_DIRECTIVES, CarComponent ]
})
export class RideComponent implements OnInit {

  rideId : string;
  rideObs : Observable<any>;
  day : Date;

  ride;

  msg : string;

  // singel object
  //chatEntryObs;
  //chatEntry;
  chatEntriesObs;
  chatEntries;

  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire, public loginService: LoginService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = params['day'];
      this.rideId = params['rideid'];
      this.rideObs = this.af.database.object('rides/' + this.day + '/' + this.rideId );
      




      // this is how MAP add a property to an OBJECT observer
      //this.chatEntryObs = this.af.database.object('rides/' + this.day + '/' + this.rideId + '/chat/-KN2a5mMcGnSXFO8IsXd') // returns an object
      //  .map( entry => {
      //    entry.newsht = "XXX";
      //    return entry;
      //  });

      // this is how MAP add a property to a LIST object observer
      this.chatEntriesObs = this.af.database.list('rides/' + this.day + '/' + this.rideId + '/chat')  // returns an array
        .map( chatEntries => {
          return chatEntries.map( entry => {
            this.af.database.object('userDetail/'+entry.userId).subscribe(
              userDetail => {
                entry.newsht = userDetail;
              }
            );
            return entry;
          })
        });


    });

    this.chatEntriesObs.subscribe( ce => {
      this.chatEntries = ce;
    });

    this.rideObs.subscribe( ride => {
      this.ride = ride;
    });

  }


  postChat(){
    console.log("Lest save msg:" + this.msg);

    let chatEntry = {
      id: 0,
      userId: this.loginService.userAuth.uid,
      msg: this.msg
    };
    let chat = this.af.database.list('rides/' + this.day + '/' + this.rideId + '/chat');
    chat.push(chatEntry);

    this.msg = '';

  }

}
