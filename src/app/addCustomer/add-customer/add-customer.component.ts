import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";
import {Customer} from "../../home/customer/models/customer-model";
import * as customerAction from "../../store/customer.action";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, OnDestroy {

  public myForm!: FormGroup;

  private subscription = new Subscription();

  public get name(){
    return this.myForm.get("fullName");
  }

  public get email(){
    return this.myForm.get("email");
  }

  public get password(){
    return this.myForm.get("password");
  }



  constructor(
    private service: CustomerService,
    private router: Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.createForm();
  }

  private createForm(){
    this.myForm = new FormGroup({
      fullName: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    },{
      updateOn: 'change'
    });
  }

  addCustomer(){
    let customer: Customer = {
      fullName: this.myForm.get("fullName")?.value,
      email: this.myForm.get("email")?.value,
      password: this.myForm.get("password")?.value
    };

    //comentat pentru a face cu effects

    // this.subscription.add(
    //   this.service.addCustomer(customer).subscribe({
    //     next: () => this.goHome(),
    //     error: err => alert(err)
    //   })
    // );

    this.store.dispatch(new customerAction.AddCustomer(customer as Customer));
    this.goHome();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }


  goHome(){
    this.router.navigate(['/home']);
  }

}
