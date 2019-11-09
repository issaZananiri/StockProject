import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';
import { MaterialsModule } from './materials/materials.module';
import { AgGridModule } from 'ag-grid-angular';
import {FlexLayoutModule} from "@angular/flex-layout";
import { OverlayModule} from '@angular/cdk/overlay';
import {LoginComponent} from "./user/login/login.component";
import { StocksgridComponent } from './stocksgrid/stocksgrid.component';
import { AllstocksComponent } from './allstocks/allstocks.component';
import { AuthGuardService }  from './auth-guard.service'
import { MyService } from './navigating-holder'
import { NavComponent } from './nav/nav.component'
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StocksgridComponent,
    AllstocksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    MaterialsModule,
    AgGridModule.withComponents([]),
    OverlayModule,
    FlexLayoutModule,

  ],
  providers: [
    UserService,
    UserStoreService,
    AuthGuardService,
    MyService,
    NavComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
