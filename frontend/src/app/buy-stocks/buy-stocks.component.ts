import { Component, OnInit, OnChanges } from '@angular/core';
import { MyServiceStockInfo } from '../services/stocks-info-buy';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-buy-stocks',
  templateUrl: './buy-stocks.component.html',
  styleUrls: ['./buy-stocks.component.scss']
})
export class BuyStocksComponent implements OnInit , OnChanges {

  
  public stockSymbol:string;
  public price;
  public numStocks=1;
  public totalPrice;
  public username;
  constructor(private http: HttpClient,private stockService:MyServiceStockInfo) { 
    this.stockSymbol=this.stockService.symbol;
    this.price=this.stockService.price;
    this.username=this.stockService.username;
    this.totalPrice=this.price*this.numStocks;

  }

  
  ngOnInit() {
    console.log(this.username);
  }
 
  ngOnChanges(){
    console.log(this.username);

    console.log(this.numStocks);
    this.totalPrice=this.price*this.numStocks;


  }
  calcPrice() {
    console.log(this.username);

      console.log(this.numStocks);
       this.totalPrice=this.price*this.numStocks;
    
    
  }
  // buy(){
  //   console.log("buy!!");
  // }
  buy(){
    this.buy1().subscribe((resp) => {
        
      
      console.log(resp);
      
    }, (err) => {
      console.error('Error buying in', err);
      alert("chose one !!!");
    })
  }
  buy1(): Observable<any> {
    console.log("buy!!");
    return this.http.post('./buystock/', {
      username: this.username,
      stockSymbol: this.stockSymbol,
      price:this.price,
      numStocks:this.numStocks
    }).pipe(map((resp: any) => { 
      console.log("!!!!!!!!!!!!!")
      console.log(resp.token);
      return resp;
    }));;
    
  }
}
