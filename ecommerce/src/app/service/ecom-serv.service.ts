import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
  minValSubject = new BehaviorSubject<number>(0);
  maxValSubject = new BehaviorSubject<number>(0);
  brandsSubject = new BehaviorSubject<any>([]);

  brandName: String = '';
  brands: String[] = [];
  minVal: number = 10000;
  maxVal: number = 0;

  constructor(private http: HttpClient) {
    this.http.get(this.path).subscribe((res) => {
      this.x = res;
      this.length = this.x.length;
      let temp: string[] = [];
      for (let item of this.x) {
        this.filteredData.push(item);
        this.productData.push(item);
        if (this.prodList.includes(item['Bb Category'])) {
          continue;
        }
        this.prodList.push(item['Bb Category']);

        if (!temp.includes(item.Brand)) {
          temp.push(item.Brand);
        }

        this.minVal = Math.min(this.minVal, item.Price);
        this.maxVal = Math.max(this.maxVal, item.Price);
      }
      this.filterSubject.next(this.filteredData);
      this.brandsSubject.next(temp);
      this.minValSubject.next(this.minVal);
      this.maxValSubject.next(this.maxVal);
    });

    this.cartListSubject.next([]);
  }

  filterBySearch(val: any) {
    this.brandName = val;
    this.brands = [];

    let temp: string[] = [];
    this.minVal = 10000;
    this.maxVal = -1000;
    for (let item of this.productData.filter((ele) => {
      return (
        ele['Bb Category']
          .toLowerCase()
          .replace(' ', '')
          .indexOf(this.brandName) != -1
      );
    })) {
      this.minVal = Math.min(this.minVal, parseInt(item.Price));
      this.maxVal = Math.max(this.maxVal, parseInt(item.Price));
      if (!temp.includes(item.Brand)) {
        temp.push(item.Brand);
      }
    }

    this.filterItem();
    this.brandsSubject.next(temp);
    this.minValSubject.next(this.minVal);
    this.maxValSubject.next(this.maxVal);
    // this.filteredData = this.productData.filter(ele => {
    //   return ele["Bb Category"].indexOf(val) != -1;
    // });
    // this.filterSubject.next(this.filteredData);
  }

  filterByPrice(min: number, max: number) {
    this.minVal = min;
    this.maxVal = max;
    this.filterItem();
    // let temp = this.filteredData.filter(ele => {
    //   return ele["Price"] >= min && ele["Price"] <= max;
    // });
    // this.filterSubject.next(temp);
  }

  filterByBrand(val: String[]) {
    this.brands = val;
    this.filterItem();

    if (this.brands.length > 0) {
      this.minVal = 10000;
      this.maxVal = -1000;
      for (let item of this.productData.filter((ele) => {
        return this.brands.includes(ele['Brand']);
      })) {
        this.minVal = Math.min(this.minVal, parseInt(item.Price));
        this.maxVal = Math.max(this.maxVal, parseInt(item.Price));
      }
    } else if (this.brandName) {
      this.minVal = 10000;
      this.maxVal = -1000;
      for (let item of this.productData.filter((ele) => {
        return (
          ele['Bb Category']
            .replace(' ', '')
            .toLowerCase()
            .indexOf(this.brandName) != -1
        );
      })) {
        this.minVal = Math.min(this.minVal, parseInt(item.Price));
        this.maxVal = Math.max(this.maxVal, parseInt(item.Price));
      }
    } else {
      this.minVal = 10000;
      this.maxVal = -1000;
      for (let item of this.productData) {
        this.minVal = Math.min(this.minVal, parseInt(item.Price));
        this.maxVal = Math.max(this.maxVal, parseInt(item.Price));
      }
    }

    this.filterItem();
    this.minValSubject.next(this.minVal);
    this.maxValSubject.next(this.maxVal);

    // if(val.length == 0) {
    //   this.filterSubject.next(this.filteredData);
    // }
    // let temp = this.filteredData.filter(ele => {
    //   return val.includes(ele["Brand"]);
    //   // return ele["Brand"].indexOf(val) != -1;
    // });
    // this.filterSubject.next(temp);
  }

  filterItem() {
    let temp: any[] = this.productData;

    if (this.brandName) {
      temp = temp.filter((ele) => {
        return (
          ele['Bb Category']
            .replace(' ', '')
            .toLowerCase()
            .indexOf(this.brandName) != -1
        );
      });
    }

    temp = temp.filter((ele) => {
      return ele['Price'] >= this.minVal && ele['Price'] <= this.maxVal;
    });

    if (this.brands.length > 0) {
      temp = temp.filter((ele) => {
        return this.brands.includes(ele['Brand']);
      });
    }
    this.filterSubject.next(temp);
  }
}
