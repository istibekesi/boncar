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
        <boncar-car></boncar-car>
      </div>

      <div class="col-sm-8">
        <h2>Ride on {{day}}</h2>
        
        
        <br/>
        
        <!--
        <ul class="list-group">
          <li *ngFor="let chatEntry of chatEntries" class="list-group-item">
            <img class="img-circle pull-right" [src]="chatEntry.newsht?.avatarUrl" heigth="36" width="36">
            {{chatEntry.msg}}
          </li>
        </ul>
        -->
        
        
        <h3>Chat</h3>
        <div *ngFor="let chatEntry of chatEntries">
            <img class="img-circle pull-left" [src]="chatEntry.newsht?.avatarUrl" heigth="36" width="36">
            <p class="text-muted">{{chatEntry.newsht?.alias}}&nbsp;</p>
            {{chatEntry.msg}}
        </div>
        
        <div>
            <img class="img-circle pull-left" [src]="loginService.userDetail?.avatarUrl" heigth="36" width="36">
            <p class="text-muted">{{loginService.userDetail?.alias}}&nbsp;</p>
            <input type="text" [(ngModel)]="msg">
            <button (click)="postChat()" class="btn btn-success">Send</button>
        </div>
        
        <!--<div class="form-group">
          <input type="text" [(ngModel)]="msg">
          <button (click)="postChat()" class="btn btn-success">Send</button>
        </div>-->
        
        <hr/>
        
        <!--
        Chat:<br/>
        {{chatEntries | json}}
        -->
        
      </div>
      
    </div>
  `,
  directives: [ ROUTER_DIRECTIVES, CarComponent ]
})
export class RideComponent implements OnInit {

  rideId : string;
  rideObs : Observable<any>;
  day : Date;

  //rideChat : Array<[number, string, string, string, string]>;
  rideChat : Array<any>;
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


      // this is how MAP add a property to a LIST object observer
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
      this.rideChat = ride.chat;
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
