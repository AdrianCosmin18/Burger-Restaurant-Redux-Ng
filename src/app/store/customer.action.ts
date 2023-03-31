import {Action} from "@ngrx/store";
import {Customer} from "../home/customer/models/customer-model";


export const GET_CUSTOMERS = "Get Customers";
export const ADD_CUSTOMER = "ADD CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE CUSTOMER";
export const DELETE_CUSTOMER = "DELETE CUSTOMER";

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

export class UpdateCustomer implements Action{
  readonly type = UPDATE_CUSTOMER;

  constructor(public email: string, public customer: Customer) {
  }
}

export class DeleteCustomer implements Action{
  readonly type = DELETE_CUSTOMER;

  constructor(public email: string) {
  }
}


export type CustomerListAction = GetCustomers | AddCustomer | UpdateCustomer | DeleteCustomer;
