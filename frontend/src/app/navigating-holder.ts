import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MyService {
  private dataMessenger = new Subject<any>();
  temp=true;
  username=""
  tempchange: EventEmitter<boolean> = new EventEmitter<boolean>();

  getData(): Subject<any> {
    return this.dataMessenger;
  }

  setData(newData: any) {
    this.dataMessenger.next(newData);
    //this.temp=false

  }
  change(){
    this.tempchange.next(!this.temp);
    this.temp=!this.temp;
  }
  setUsername(username:string){
    this.username=username;

  }
}