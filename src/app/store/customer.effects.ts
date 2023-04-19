import {Inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CustomerService} from "../services/customer.service";
import * as CustomerAction from "./customer.action";
import {catchError, EMPTY, map, of, switchMap, take, tap} from "rxjs";
import {Customer} from "../home/customer/models/customer-model";



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
          return new CustomerAction.AddCustomerSuccess(data);
        })
      ))
    )
  });

  updateCustomer$ = createEffect(() => {
    return this.action.pipe(
      ofType(CustomerAction.UPDATE_CUSTOMER),
        take(1),
        switchMap((customerData: CustomerAction.UpdateCustomer) => this.customerService.updateCustomer(customerData.email, customerData.customer).pipe(
          tap(() => console.log("effect update customer")),
          map(data => {
            return new CustomerAction.UpdateCustomerSuccess(data);
          }),
          catchError(err => {
            console.log(err);
            return EMPTY;
          })
        )))
  });

  deleteCustomer$ = createEffect(() => {
    return this.action.pipe(
      ofType(CustomerAction.DELETE_CUSTOMER),
        take(1),
        switchMap((customerData: CustomerAction.DeleteCustomer) => this.customerService.deleteCustomer(customerData.email).pipe(
          tap(() => console.log("effect from deleting car")),
          map(data => {
            return new CustomerAction.DeleteCustomerSuccess();
          }),
          catchError(err => {
            console.log(err);
            return EMPTY;
          })
        ))
    )
  })
}

