import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../home/customer/models/customer-model";

import{ Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';




@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  public formUpdate!: FormGroup;
  public emailUrl: string = '';
  private customer!: Customer;

  public get name(){
    return this.formUpdate.get("fullName");
  }

  public get email(){
    return this.formUpdate.get("email");
  }

  public get password(){
    return this.formUpdate.get("password");
  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: CustomerService,
    public store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.createForm();
    this.getCustomerFromUrl();
    this.putCustomerInUpdateForm();
  }

  private createForm(){
    this.formUpdate = new FormGroup({
      fullName: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    },{
      updateOn: 'change'
    });
  }

  getCustomerFromUrl(){
    this.activatedRoute.params.subscribe({
      next: (url) => {
        this.emailUrl = url["email"];

        let customers: Customer[] = [];
        this.store.select("customers").subscribe(data => {
          customers = data.customersList.filter(c => c.email === this.emailUrl);
          this.customer = customers[0];
        });
      },
      error: err => alert("Something went wrong")
    })
  }

  putCustomerInUpdateForm(){
    this.formUpdate.setValue({
      fullName: this.customer.fullName,
      email: this.customer.email,
      password: this.customer.password
    });
  }

  saveCustomer(){
    let customer: Customer = this.formUpdate.value;
    console.log(customer);

    this.service.updateCustomer(this.emailUrl, customer).subscribe({
      next: () => this.goHome(),
      error: err => alert("Something went wrong")
    })
  }

  deleteCustomer(){
    let emailToDelete = this.formUpdate.get("email")?.value;

    this.service.deleteCustomer(emailToDelete).subscribe({
      next: () => this.goHome(),
      error: err => alert(err)
    })
  }


  goHome(){
    this.router.navigate(['/home']);
  }
}
