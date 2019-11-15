import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MyServiceStockInfo {
  private dataMessenger = new Subject<any>();
  username="";
  symbol;
  price;

//   getData(): Subject<any> {
//     return this.dataMessenger;
//   }

//   setData(newData: any) {
//     this.dataMessenger.next(newData);
//   }
  
}