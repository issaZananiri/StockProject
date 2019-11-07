import { Component, OnInit, HostBinding, Input, Injectable ,ChangeDetectorRef} from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { AuthGuardService }  from '.././auth-guard.service'
import { MyService } from '../navigating-holder'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
@Injectable()
export class NavComponent implements OnInit {
  show = false;
  private ref:ChangeDetectorRef;

  constructor(private authGuardService: AuthGuardService,public overlayContainer: OverlayContainer,private myService: MyService) {}

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
  ngOnInit() {
     this.show=this.myService.temp

  }
  changShow(){
    // this.ref.
  }
}
