import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatSliderModule, MatIconModule, MatTableModule,MatToolbarModule, MatDividerModule, MatMenuModule  } from '@angular/material';

const MaterialsComponents =[
  MatSliderModule,
  MatInputModule,  
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatDividerModule,
  MatMenuModule,
]

@NgModule({
  imports: [MaterialsComponents],
  exports: [MaterialsComponents]
})
export class MaterialsModule { }
