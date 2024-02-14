import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MedicineserviceService} from '../medicineservice.service';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.css']
})
export class CheckoutDetailsComponent implements OnInit {
  selectedMedicines: any[] = [];
  totalPrice: number = 0;
  message:string='';
  checkoutForm: FormGroup = new FormGroup({});


  constructor(private http: HttpClient,private route: ActivatedRoute,private formBuilder: FormBuilder,
    private router: Router,private service:MedicineserviceService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkoutForm = this.formBuilder.group({
        // Define user information fields here...
        name: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required]
      });

      this.selectedMedicines = JSON.parse(params['selectedMedicines']);
      this.totalPrice = params['totalPrice'];

    });
  }

  payForMedicines() {
    console.log('payForMedicines called');

    
  // Navigate to the CheckoutDetailsComponent and pass data as query parameters
  this.router.navigate(['/payment'], {
    queryParams: {
      selectedMedicines: JSON.stringify(this.selectedMedicines),
      totalPrice: this.totalPrice
       }
    
  });
  console.log('Pay:'+this.totalPrice);

}

  // Create a method to handle user information and data insertion
  insertData(name: string, phone: string, address: string): void {
    // Use an HTTP request to send user information and selected medicines to the server
    /*
    const requestData = {
      name: name,
      phone: phone,
      address: address,
      selectedMedicines: this.selectedMedicines,
      totalPrice: this.totalPrice
    };
*/
    this.selectedMedicines.forEach(medicine => {
      const individualMedicine = {
        medicine_name: medicine.name,
        quantity: medicine.quantity,
        price: medicine.price,
        name: name,
        phone: phone,
        address: address
      };

      console.log('Individual Medicines '+ individualMedicine);
      let resp=this.service.addMedicine(individualMedicine);
     
      resp.subscribe((data: any) => {
        this.message = data;
        console.log("message: " + this.message);
      
      },
      (error) => { console.error('Error adding Medicine', error) }
      
      );

      /*
    this.http.post('http://localhost:3000/addMedicine', individualMedicine).subscribe((response: any) => {
      console.log(response.message);
      this.message = response.message
    },
      (error) => { console.error('Error adding Medicine', error) }
    );
*/


  });


    console.log('Selected Medicines on checkout '+ this.selectedMedicines);
    console.log('price on checkout '+  this.totalPrice);
    console.log('name on checkout '+  name);
    console.log('phone on checkout '+  phone);
    console.log('address on checkout '+  address);

   console.log('Navigate to payment ');

    // Perform an HTTP request to insert the data into the database
    // You can use HttpClient here

    this.payForMedicines();
  }


}
