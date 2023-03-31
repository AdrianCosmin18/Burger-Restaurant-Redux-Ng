import {Action} from "@ngrx/store";
import {Customer} from "../home/customer/models/customer-model";


export const GET_CUSTOMERS = "Get Customers";
export const ADD_CUSTOMER = "ADD CUSTOMER";

export class GetCustomers implements Action{
  readonly type = GET_CUSTOMERS;

  constructor(public customers: Customer[]) {
  }
}

export class AddCustomer implements Action{
  readonly type = ADD_CUSTOMER;

  constructor(public customer: Customer) {
  }
}


export type CustomerListAction = GetCustomers | AddCustomer;
