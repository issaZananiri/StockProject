import { Component, OnInit, HostBinding, Input, Injectable ,ApplicationRef, ComponentRef,ViewChild, ViewContainerRef, TemplateRef  } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { AuthGuardService }  from '.././auth-guard.service'
import { MyService } from '../navigating-holder'
import { Subject,interval } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
@Injectable()
export class NavComponent implements OnInit  {
 
 
  show = this.myService.temp;
  show1 = true;
   source = interval(10000);
   comRef:ComponentRef<NavComponent> ;
  _subscription: any;

   
  constructor(private router: Router,private appRef: ApplicationRef,private authGuardService: AuthGuardService,public overlayContainer: OverlayContainer,private myService: MyService) {
    this._subscription = myService.tempchange.subscribe((value) => { 
      this.show = value; 
    });
  }

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    // this.show=this.myService.temp
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
  ngOnInit() {
    // this.show = this.myService.temp;
    console.log(this.show);
    console.log(this.myService.temp);

  }
 

  changShow(){
    // this.ref.
    this.show=this.myService.temp;
    console.log("yeee"+this.show);
    console.log(this.myService.temp);

    //setTimeout(this.appRef.tick, 1000);
    //this.intervalId = setInterval(this.appRef.tick, 10000);
    setTimeout(() => {
      this.chechTimer();

    }, 10000);
    
  }
  chechTimer(){
    this.appRef.tick();
    console.log("yup nigga");
  }
  hideCon(){
    this.show1=!this.show1;
  }
  signout(){
    console.log(this.authGuardService.isLoggedIn);
    this.myService.change();
    this.authGuardService.isLoggedIn=false;
    console.log(this.authGuardService.isLoggedIn);
    this.router.navigateByUrl('login')



  }
}
