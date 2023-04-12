import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './home/customer/customer.component';
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {StoreModule} from "@ngrx/store";
import * as fromApp from './store/app.reducer';
import { AddCustomerComponent } from './addCustomer/add-customer/add-customer.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import {EffectsModule} from "@ngrx/effects";
import {CustomerEffects} from "./store/customer.effects";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomerComponent,
    AddCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
    ReactiveFormsModule,
    EffectsModule.forRoot(([CustomerEffects]))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
