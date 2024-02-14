import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit{
  selectedMedicines: any[] = [];
  totalPrice: number = 0;
  message:string='';
  checkoutForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient,private route: ActivatedRoute,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkoutForm = this.formBuilder.group({
        // Define user information fields here...
      });

      this.selectedMedicines = JSON.parse(params['selectedMedicines']);
      this.totalPrice = params['totalPrice'];
    });
  }


}
