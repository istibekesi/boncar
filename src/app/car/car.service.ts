import { Injectable } from '@angular/core';

@Injectable()
export class CarService {
  onlineInstaArray : Array<any> = [
    {id : "fill_0" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13534613_636974456453550_618068237_n.jpg"},
    {id : "fill_1" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12918008_1962044680688116_1118873059_n.jpg"},
    {id : "fill_2" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13126639_604190149748207_1359223909_n.jpg"},
    {id : "fill_3" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13534190_1616399882007175_1503611030_n.jpg"},
    {id : "fill_4" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13408989_1733237326948148_1354724988_n.jpg"},
    {id : "fill_5" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12976339_219013415140153_241427669_n.jpg"},
    {id : "fill_6" , src: "https://scontent-vie1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12328302_988114234610928_1021012051_n.jpg"}

  ];

  instaArray : Array<any> = [
    {id : "fill_0" , src: "a0.jpg"},
    {id : "fill_1" , src: "a1.jpg"},
    {id : "fill_2" , src: "a2.jpg"},
    {id : "fill_3" , src: "a3.jpg"},
    {id : "fill_4" , src: "a4.jpg"},
    {id : "fill_5" , src: "a5.jpg"},
    {id : "fill_6" , src: "a6.jpg"}
  ];

  getRandomInstaAvatar() : any {
    let rand = Math.floor((Math.random() * this.onlineInstaArray.length) );
    console.log('Random ****' + rand);
    return this.onlineInstaArray[rand];
  }

  /**
   * Makes sure, the result is differnt from the previous
   */
  getNewRandomInstaAvatar(oldA : string) : any {
    let rand = Math.floor((Math.random() * this.onlineInstaArray.length) );
    console.log('Random ****' + rand);
    let newA = this.onlineInstaArray[rand];
    if (oldA == newA.src) {
      return this.getNewRandomInstaAvatar(oldA);
    }
    return newA;
  }

}
