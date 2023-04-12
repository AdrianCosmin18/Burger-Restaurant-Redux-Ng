import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CustomerService} from "../services/customer.service";
import * as CustomerAction from "./customer.action";
import {catchError, EMPTY, map, switchMap, take, tap} from "rxjs";
import {Customer} from "../home/customer/models/customer-model";
import {hasBeenProcessed} from "@angular/compiler-cli/ngcc/src/packages/build_marker";



@Injectable()
export class CustomerEffects{

  constructor(
    private action: Actions,
    private customerService: CustomerService
  ) {}

  loadCustomers$ = createEffect(() => {
    return this.action.pipe(
      ofType(CustomerAction.GET_CUSTOMERS), //vreau acest tip de action
      take(1), //vreau sa mi faca liste de clienti o sg data
      switchMap(customerData =>
        this.customerService.getCustomers().pipe(
          tap(() => console.log("effect get customers")),
          map(response => new CustomerAction.GetCustomers(response)),
          catchError(err => {
            console.log(err);
            return EMPTY;
          })
        )
      )
    )
  });

  addCustomer$ = createEffect(() => {
    return this.action.pipe(
      ofType(CustomerAction.ADD_CUSTOMER),
      take(1),
      switchMap((customerData: CustomerAction.AddCustomer) => this.customerService.addCustomer(customerData.customer).pipe(
        tap(() => console.log("effect add customer")),
        map(data => {
          return new CustomerAction.AddCustomer(data);
        })
      ))
    )
  })
}

const handleCustomer = (customer: Customer) => {
  return new CustomerAction.AddCustomerSuccess(customer);
}
