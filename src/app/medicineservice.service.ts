import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineserviceService {

  constructor(private http:HttpClient) { }


  public addMedicine(medicine:any){
    return this.http.post("http://localhost:3000/addMedicine",medicine,{responseType:'text' as 'json'})
  }

  public getallMedicines(){
    return this.http.get("http://localhost:3000/getMedicines")
  }
  
  public getmyMedicines(name:any){
    return this.http.get("http://localhost:3000/getMedicineByName/"+name)
  }

  public getMedicinebyid(id:any){
    return this.http.get("http://localhost:3000/getMedicine/"+id)
  }


  public cancelMedicine(id:any){
    return this.http.delete("http://localhost:3000/deleteMedicine/"+id)
  }

}
