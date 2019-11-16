import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material';
import {
  MatButtonModule, MatInputModule, MatSliderModule, MatIconModule, MatTableModule, MatToolbarModule, MatDividerModule,
  MatMenuModule, MatSidenavModule, MatListModule, MatCardModule, MatProgressSpinnerModule, MatSlideToggleModule
} from '@angular/material';

const MaterialsComponents = [
  MatSliderModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatDividerModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatRippleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
]

@NgModule({
  imports: [MaterialsComponents],
  exports: [MaterialsComponents]
})
export class MaterialsModule { }
