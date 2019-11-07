import { Component, Input ,ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service'
import { NavComponent } from '../../nav/nav.component'
import { MyService } from '../../navigating-holder'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username: string = '';
  public password: string = '';

  public message: string = '';

  @ViewChild(NavComponent,{static: false}) nav: NavComponent;
  // @Input() public nav: NavComponent;
  constructor(private userService: UserService,private myService: MyService,private navi:NavComponent, 
              private router: Router,private authGuardService: AuthGuardService) { }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((resp) => {
        
        this.message = resp;
        console.log(this.message);
        if(this.message == "logged in successfully"){
          this.authGuardService.isLoggedIn=true
          console.log("yeayea");this.router.navigateByUrl('favStocks')
          console.log(this.myService.temp)
          this.myService.setData(true)
          console.log(this.myService.temp)
          
          console.log(this.navi.show);
          //this.navi.show=true;
          this.navi.ngOnInit()
          this.navi.changShow()
          console.log(this.navi.show);

        }
        // this.router.navigate(['stock', 'list'], {
        //   queryParams: {page: 1}
        // });
      }, (err) => {
        console.error('Error logging in', err);
        this.message = err.error.msg;
      });
  }
}