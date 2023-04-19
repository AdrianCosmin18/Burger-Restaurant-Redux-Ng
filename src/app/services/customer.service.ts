import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {Customer} from "../home/customer/models/customer-model";
import {Store} from "@ngrx/store";
import * as CustomerAction from '../store/customer.action';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "http://localhost:8080/burger-shop/customer-controller";

  constructor(private http: HttpClient, public store: Store<fromApp.AppState>) { }

  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  addCustomer(customer: Customer): Observable<Customer>{

    //comentat pentru a face cu effects

    // let aux = customer;
    // aux.id = this.generateRandomId();
    // this.store.dispatch(new CustomerAction.AddCustomer(aux));

    return this.http.post<Customer>(this.url, customer)
      .pipe(catchError(this.handleError));
  }

  updateCustomer(email: string, customer: Customer): Observable<Customer>{

    //comentat pentru a face cu effects
    // let aux = customer;
    // aux.id = this.generateRandomId();
    // this.store.dispatch(new CustomerAction.UpdateCustomer(email, aux));

    let path = `${this.url}/${email}`;
    return this.http.put<Customer>(path, customer)
      .pipe(catchError(this.handleError));
  }

  deleteCustomer(email: string): Observable<void>{

    //this.store.dispatch(new CustomerAction.DeleteCustomer(email));
    let path = `${this.url}/delete-customer/${email}`;
    return this.http.delete<void>(path)
      .pipe(catchError(this.handleError));
  }





  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }

  private generateRandomId():number{

    let customers :Customer[] = [];
    this.store.select("customers").subscribe(data => {
      customers = data.customersList;
    })

    let id=Math.floor(Math.random()*1000);
    while(customers.filter(e=>e.id==id).length>0){
      id=Math.floor(Math.random()*1000);
    }
    return id;
  }
}
