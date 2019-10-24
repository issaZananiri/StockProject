import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public overlayContainer: OverlayContainer) {}

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
  ngOnInit() {
  }
}
