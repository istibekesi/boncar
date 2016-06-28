import { Injectable } from '@angular/core';

@Injectable()
export class CarService {
  instaArray : Array<any> = [
    {id : "fill_0" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/13413244_1043651565710149_835427729_n.jpg"},
    {id : "fill_1" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13402297_270210406702581_1449139749_n.jpg"},
    {id : "fill_2" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13398501_1008870309191337_1018620738_n.jpg"},
    {id : "fill_3" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13259568_243510826006314_1553548347_n.jpg"},
    {id : "fill_4" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13249805_872860182859674_384956343_n.jpg"},
    {id : "fill_5" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c1.0.1078.1078/13151230_1620141114973447_389653414_n.jpg"},
    {id : "fill_6" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12918008_1962044680688116_1118873059_n.jpg"}
  ];

  getRandomInstaAvatar() : any {
    let rand = Math.floor((Math.random() * this.instaArray.length) );
    console.log('Random ****' + rand);
    return this.instaArray[rand];
  }

}
