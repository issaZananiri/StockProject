import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocksgrid',
  templateUrl: './stocksgrid.component.html',
  styleUrls: ['./stocksgrid.component.scss']
})
export class StocksgridComponent implements OnInit {
  private _http;
    newData =[{stock: 'news', username: 'soos'}];

  columnDefs = [
    { headerName: 'stock', field: 'stock', sortable: true, filter: true },
    { headerName: 'username', field: 'username', sortable: true, filter: true },
    // { headerName: 'Price', field: 'Price', sortable: true, filter: true },
    // { headerName: 'Change', field: 'Change', sortable: true, filter: true }
  ];

  constructor(http: HttpClient) {
    this._http = http;
  }

  ngOnInit() {
  }




  getNotifications = () =>{
    this.getNotificationsapi().subscribe(data => {
      this.newData = data;
    });

  }

  getNotificationsapi() {
    return this._http.get('./favStock/moham');
  }
}
