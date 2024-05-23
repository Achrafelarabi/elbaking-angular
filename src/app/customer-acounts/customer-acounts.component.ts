import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-customer-acounts',
  templateUrl: './customer-acounts.component.html',
  styleUrl: './customer-acounts.component.css'
})
export class CustomerAcountsComponent implements OnInit {
  customerId!:string;
  customer!:Customer;
  constructor(private route: ActivatedRoute,private router:Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }
  ngOnInit() {
this.customerId=this.route.snapshot.params['id'];
  }

}
