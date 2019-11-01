import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service'
@Component({
  selector: 'app-allstocks',
  templateUrl: './allstocks.component.html',
  styleUrls: ['./allstocks.component.scss']
})
export class AllstocksComponent implements OnInit {

  newData =[{symbol: 'yeasets', companyName:'testit', change: 1.3, latestPrice:123}];

  columnDefs = [
    { headerName: 'stock', field: 'symbol', sortable: true, filter: true },
    { headerName: 'companyName', field: 'companyName', sortable: true, filter: true },
    { headerName: 'Price', field: 'latestPrice', sortable: true, filter: true },
    { headerName: 'Change', field: 'change', sortable: true, filter: true }
  ];

  constructor(private _http: HttpClient) {
    this.getNotifications()
  }

  // constructor(private api: ApiService) {
  //   this.getNotifications()
  // }
  ngOnInit() {
  }




  getNotifications = () =>{
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
