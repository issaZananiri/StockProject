import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MyService {
  private dataMessenger = new Subject<any>();
  temp=false
  getData(): Subject<any> {
    return this.dataMessenger;
  }

  setData(newData: any) {
    this.dataMessenger.next(newData);
    this.temp=true
  }
}