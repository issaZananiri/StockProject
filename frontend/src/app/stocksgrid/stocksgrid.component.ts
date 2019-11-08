import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stocksgrid',
  templateUrl: './stocksgrid.component.html',
  styleUrls: ['./stocksgrid.component.scss']
})
export class StocksgridComponent implements OnInit {
  
  newData =[{symbol: 'test', change: 1.3, latestPrice:123}];
  rowIndex = (params) => params.node.rowIndex + 1
  
  columnDefs = [
    { headerName: 'stock', field: 'symbol', sortable: true, filter: true },
    { headerName: 'Price', field: 'latestPrice', sortable: true, filter: true },
    { headerName: 'Change', field: 'change', sortable: true, filter: true }
  ];

  constructor(private _http: HttpClient) {
    this.getNotifications()
  }

  ngOnInit() {}


  getNotifications = () =>{
    this.getNotificationsapi().subscribe(data => {
      this.newData = data;
    });

  }

  getNotificationsapi() {
    return this._http.get<any>('./favStocksInfo/moham');
  }
}
