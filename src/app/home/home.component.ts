import { Component, OnInit } from '@angular/core';
import {Customer} from "./customer/models/customer-model";
import {Subscription} from "rxjs";
import {CustomerService} from "../services/customer.service";
import {Store} from '@ngrx/store';
import {Router} from "@angular/router";
import * as fromApp from '../store/app.reducer';
import * as customerActions from '../store/customer.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public customers: Customer[] = [];

  public subscription= new Subscription();

  constructor(private service: CustomerService,
              private store:Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit(): void {

    this.store.select("customers").subscribe(data => {
      this.customers = data.customersList
    })
  }

  getCustomers(){
    this.subscription.add(
      this.service.getCustomers().subscribe({
        next: list => {
          this.store.dispatch(new customerActions.GetCustomers(list))
        },
        error: err => alert(err)
      })
    )
  }


  onClick(){
    this.getCustomers();
  }

  goToAddCustomer(){

    this.router.navigate(['/add-customer']);
  }

}
