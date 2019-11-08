import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  changeTheme(){
    if(document.body.classList.contains("default-theme")){
       document.body.classList.remove("default-theme");
       document.body.classList.add("dark-theme");
    }
    else{
      document.body.classList.remove("dark-theme");
      document.body.classList.add("default-theme");
    }

  }
  constructor(private router: Router) {}
  ngOnInit() {
  }
}
