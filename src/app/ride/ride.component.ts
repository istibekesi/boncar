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
        
        <hr/>
        
        Chat:<br/>
        {{rideChat | json}}
        
        
        <div class="form-group">
          <input type="text" [(ngModel)]="msg">
          <button (click)="postChat()" class="btn btn-success">Send</button>
        </div>
        
        <hr/><hr/><hr/>
        
        {{entries}}
        
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

  entries;


  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire, public loginService: LoginService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.day = params['day'];
      this.rideId = params['rideid'];
      this.rideObs = this.af.database.object('rides/' + this.day + '/' + this.rideId );

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

  }

}
