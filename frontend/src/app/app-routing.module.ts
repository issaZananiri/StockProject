import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import {StocksgridComponent} from './stocksgrid/stocksgrid.component';

const routes: Routes = [
  { path: 'index', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'favStocks', component: StocksgridComponent },
  { path: 'stocks', component: StocksgridComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, RegisterComponent, NavComponent, StocksgridComponent]
