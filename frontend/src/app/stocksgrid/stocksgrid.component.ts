import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyService } from '../navigating-holder';
import { ButtonRendererComponent } from '../allstocks/button-renderer.component';
import { Router } from '@angular/router';
import { MyServiceStockInfo } from '../services/stocks-info-buy'

@Component({
  selector: 'app-stocksgrid',
  templateUrl: './stocksgrid.component.html',
  styleUrls: ['./stocksgrid.component.scss']
})
export class StocksgridComponent implements OnInit {
  //symbol: 'test', change: 1.3, latestPrice:123
  newData =[{}];
  rowIndex = (params) => params.node.rowIndex + 1
  username=""
  frameworkComponents: any;
  buttonRenderer: ButtonRendererComponent;
  columnDefs = [
    { headerName: 'stock', field: 'symbol', sortable: true, filter: true },
    { headerName: 'Price', field: 'latestPrice', sortable: true, filter: true },
    { headerName: 'Change', field: 'change', sortable: true, filter: true },
    { headerName: 'َquantity', field: 'quantity', sortable: true, filter: true },
    { headerName: 'BUY' ,cellRendererFramework: ButtonRendererComponent,cellRendererParams: {
      onClick: this.onBtnClick1.bind(this),
      label: 'BUY'
    }
    
  }

  ];

  constructor(private _http: HttpClient,private myService: MyService,private router:Router,private stockService:MyServiceStockInfo) {
    this.username=this.myService.username;
    this.frameworkComponents = {
      'buttonRenderer': ButtonRendererComponent,
    }
    this.getNotifications();
  }

  ngOnInit() {
    console.log(this.newData);
  }
  onBtnClick1(e) {
    console.log(e.rowData['id']);
    console.log(this.username);
    this.stockService.price=e.rowData['latestPrice'];
    this.stockService.symbol=e.rowData['symbol'];
    this.stockService.username=this.username;
    this.router.navigateByUrl('buystocks');

  }

  getNotifications = () =>{
    this.getNotificationsapi().subscribe(data => {
      this.newData = data;
    });

  }

  getNotificationsapi() {
    // return this._http.get<any>('./favStocksInfo/moham');
     return this._http.get<any>('./favStocksInfo/'+this.username);
    
  }
  getBooks()
  {
    return this._http
      .post("./logindata/","5") // POST request with argument
  }
}
