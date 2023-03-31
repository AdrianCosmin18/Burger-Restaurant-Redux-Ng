import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "./models/customer-model";
import {Router} from "@angular/router";

@Component({
  selector: '.customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input() customer: Customer = {
    id: 0,
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  putUrl(){
    return this.customer.email;
  }

}
