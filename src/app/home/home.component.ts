import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import medicinedata from '../../assets/medicines.json';
import { ActivatedRoute, Router } from '@angular/router';

interface MedicineInt{
  name:string;
  alternate_name:string;
  price:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 

  selectedMedicine: string = '';
  quantity: number = 1;
  selectedMedicines: { name: string, price: number, quantity: number }[] = [];
  message:string='';

  medicines: any[] = [];
  //medicines: MedicineInt[] = medicinedata;
  totalPrice: number = 0;

  constructor(private http: HttpClient,private router: Router) {}


  ngOnInit(): void {
    console.log('Fetching medicine data...');
    this.http.get('assets/medicines.json').subscribe(
      (data: any) => {
        console.log('Medicine data fetched:', data); 
        this.medicines = data.medicines;
        console.log('Medicine data fetched3:', this.medicines); 
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

 
  addMedicine(): void {

    const selectedMedicine = this.selectedMedicine;
    const quantity = parseInt(this.quantity.toString());

    if (!selectedMedicine || isNaN(quantity)) {
      alert('Please enter a valid medicine and quantity.');
      return;
    }

    const medicine = this.medicines.find(m => m.name === selectedMedicine);
    if (!medicine) {
      alert('Selected medicine not found.');
      return;
    }

    this.selectedMedicines.push({ name: medicine.name, price: medicine.price, quantity: quantity });

    this.selectedMedicine = '';
    this.quantity = 1;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.selectedMedicines.reduce((total, med) => total + med.price * med.quantity, 0);
  }

  updateTotalPrice(): void {
    this.calculateTotalPrice();
  }

  deleteMedicine(index: number): void {
    this.selectedMedicines.splice(index, 1);
    this.calculateTotalPrice();
  }

  checkoutMedicines() {
    console.log('checkout called');

    if (this.selectedMedicines.length === 0) {
      alert('Please add at least one medicine before checking out.');
      return;
    }

    this.calculateTotalPrice();
    console.log('Selected Medicines '+ this.selectedMedicines);



  // Navigate to the CheckoutDetailsComponent and pass data as query parameters
  this.router.navigate(['/checkout-details'], {
    queryParams: {
      selectedMedicines: JSON.stringify(this.selectedMedicines),
      totalPrice: this.totalPrice
    }
  });


}
}
