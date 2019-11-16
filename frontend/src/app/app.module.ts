import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { UserService } from './services/user.service';
import { UserStoreService } from './services/user-store.service';
import { MaterialsModule } from './materials/materials.module';
import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from "@angular/flex-layout";
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from "./user/login/login.component";
import { StocksgridComponent } from './stocksgrid/stocksgrid.component';
import { AllstocksComponent } from './allstocks/allstocks.component';
import { AuthGuardService } from './services/auth-guard.service'
import { MyService } from './navigating-holder'
import { NavComponent } from './nav/nav.component'
import { ButtonRendererComponent } from './allstocks/button-renderer.component';
import { BuyStocksComponent } from './buy-stocks/buy-stocks.component'
import { MyServiceStockInfo } from './services/stocks-info-buy'
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StocksgridComponent,
    AllstocksComponent,
    ButtonRendererComponent,
    BuyStocksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    MaterialsModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    OverlayModule,
    FlexLayoutModule,

  ],
  providers: [
    UserService,
    UserStoreService,
    AuthGuardService,
    MyService,
    NavComponent,
    ButtonRendererComponent,
    MyServiceStockInfo,

  ],
  bootstrap: [AppComponent]
  , entryComponents: [ButtonRendererComponent]
  , exports: [ButtonRendererComponent]

})
export class AppModule {

}
