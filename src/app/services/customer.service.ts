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

  addCustomer(customer: Customer): Observable<void>{

    let aux = customer;
    aux.id = this.generateRandomId();

    this.store.dispatch(new CustomerAction.AddCustomer(aux));

    return this.http.post<void>(this.url, customer)
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
