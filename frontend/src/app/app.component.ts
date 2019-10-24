import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  newData =[{stock:'news',username:'soos'}];

  constructor(private _http:HttpClient){
    this.getNotifications()
  }
  columnDefs = [
    { headerName: 'stock', field: 'stock', sortable: true, filter: true },
    { headerName: 'username', field: 'username', sortable: true, filter: true },
    // { headerName: 'Price', field: 'Price', sortable: true, filter: true },
    // { headerName: 'Change', field: 'Change', sortable: true, filter: true }

  ];
 

  getNotifications = () =>{
    this.getNotificationsapi().subscribe(data =>{this.newData=data})
    
  }
 
  getNotificationsapi(){
    return this._http
      .get<any>("./favStock/moham")
  }
  // rowData = [
  //   { ID: '1', Symbol: 'ap', Price: 35000 },
  //   { ID: '2', Symbol: 'io', Price: 3500 },
  //   { ID: '3', Symbol: 'AA', Price: 350 }

  // ];
}
