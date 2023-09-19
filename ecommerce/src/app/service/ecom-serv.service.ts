import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EcomServService {
  path: string = './../../../assets/ecommerce.json';
  productData: any[] = [];
  length: number = 0;
  prodList: any = [];
  x: any;
  cartList: any[] = [];
  cartListSubject = new BehaviorSubject<any>([]);

  filteredData: any[] = [];
  filterSubject = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
    this.http.get(this.path).subscribe(res => {
      this.x = res;
      this.length = this.x.length;
      for(let item of this.x) {
        this.filteredData.push(item);
        this.productData.push(item);
        if(this.prodList.includes(item["Bb Category"])) {
          continue;
        }
        this.prodList.push(item["Bb Category"]);
      }
      this.filterSubject.next(this.filteredData);
    });

    this.cartListSubject.next([]);
   }  

   filterBySearch(val: any) {
    this.filteredData = this.productData.filter(ele => {
      return ele["Bb Category"].indexOf(val) != -1;
    });
    this.filterSubject.next(this.filteredData);
   }

   filterByPrice(min: number, max: number) {
    let temp = this.filteredData.filter(ele => {
      return ele["Price"] >= min && ele["Price"] <= max;
    });
    this.filterSubject.next(temp);
   }

   filterByBrand(val: String[]) {
    if(val.length == 0) {
      this.filterSubject.next(this.filteredData);
    }
    let temp = this.filteredData.filter(ele => {
      return val.includes(ele["Brand"]);
      // return ele["Brand"].indexOf(val) != -1;
    });
    this.filterSubject.next(temp);
   }


}
