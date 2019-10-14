
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'djint';
  notifications=[{notifications:'test'}]
  constructor(private _http:HttpClient) {
    this.getNotifications()
  }
  getNotifications = () =>{
    this.getNotificationsapi().subscribe(data =>{this.notifications=data})
    
  }
 
  getNotificationsapi(){
    return this._http
      .get<any>("./notifications/moham")
  }
  c1:Cust = new Cust();
  click1(){
    this.getBooks().subscribe(b => this.c1.type = b.toString())
  }
  click2(){
    this.getAllBooks().subscribe(b => this.c1 = b)
  }
 
  getAllBooks()
  {
    return this._http
      .get<Cust>("./notifications/moham") // GET request  
  }
  getBooks()
  {
    return this._http
      .post("./apitest/","5") // POST request with argument
  }
}
 
export class Cust{
  stock:string;
  type:string;
  
}