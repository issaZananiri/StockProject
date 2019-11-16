import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service'
import { ButtonRendererComponent } from './button-renderer.component'
import { MyService } from '../navigating-holder';
import { MyServiceStockInfo } from '../services/stocks-info-buy'
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
@Component({
  selector: 'app-allstocks',
  templateUrl: './allstocks.component.html',
  styleUrls: ['./allstocks.component.scss']
})
export class AllstocksComponent implements OnInit {

  newData = [{ symbol: 'yeasets', companyName: 'testit', change: 1.3, latestPrice: 123 }];
  username = ""
  frameworkComponents: any;
  buttonRenderer: ButtonRendererComponent;
  // entryComponentsMap = {
  //   'buttonRenderer': ButtonRendererComponent
  // };

  constructor(private _http: HttpClient, private myService: MyService, private stockService: MyServiceStockInfo, private router: Router, private authGuardService: AuthGuardService) {
    this.username = this.myService.username;
    this.getNotifications()
    this.frameworkComponents = {
      'buttonRenderer': ButtonRendererComponent,
    }

  }
  columnDefs = [
    { headerName: 'stock', field: 'symbol', sortable: true, filter: true },
    { headerName: 'companyName', field: 'companyName', sortable: true, filter: true },
    { headerName: 'Price', field: 'latestPrice', sortable: true, filter: true },
    { headerName: 'Change', field: 'change', sortable: true, filter: true },
    {
      headerName: 'BUY', cellRendererFramework: ButtonRendererComponent, cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'BUY'
      }

    }
    //  {headerName:'BUY', cellRenderer: params => {
    //   return `<button class="button" (click)="onBtnClick1()" color="blue">BUY</button>`;
    // }}
  ];



  onBtnClick1(e) {

    if (!this.authGuardService.isLoggedIn) {
      alert("please login");
    } else {
      console.log(e.rowData['symbol']);
      console.log(this.username);
      this.stockService.price = e.rowData['latestPrice'];
      this.stockService.symbol = e.rowData['symbol'];
      this.stockService.username = this.username;
      this.router.navigateByUrl('buystocks');
    }
  }
  // constructor(private api: ApiService) {
  //   this.getNotifications()
  // }
  ngOnInit() {
  }




  getNotifications = () => {
    this.getNotificationsapi().subscribe(data => {
      this.newData = data;
    });
    // this.api.getNotificationsapi.subscribe(data => {
    //   this.newData = data;
    // });

    // this.api.getNotificationsapi().subscribe(data => {
    //   this.newData = data;
    // },
    // error =>{
    //   console.log(error)
    // }
    // );

  }

  getNotificationsapi() {
    return this._http.get<any>('./top20stocks');
  }

}
