import { Component } from '@angular/core';
import { EcomServService } from '../service/ecom-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  productData: any;
  data: any;
  length: number = 0;
  ind = 0;
  size = 10;
  cartList: any[] = [];

  constructor(private ecomServ: EcomServService, private router: Router) {
    this.ecomServ.filterSubject.subscribe((x) => {
      this.productData = x;
      this.length = this.productData.length;
      this.data = this.productData.slice(
        this.ind * this.size,
        (this.ind + 1) * this.size
      );
    });

    this.ecomServ.cartListSubject.subscribe((e) => {
      this.cartList = e;
    });
  }

  getImage(item: any) {
    return item['Image Url'].split('|')[0];
  }

  getTitle(item: any) {
    return item['Product Title'];
  }

  set(val: any) {
    // console.log('a');
    // this.ind = val.pageIndex;
    // this.size = val.pageSize;
    // this.data = this.productData.slice(
    //   val.pageIndex * val.pageSize,
    //   (val.pageIndex + 1) * val.pageSize
    // );
  }

  handlePageEvent(val: any) {
    this.ind = val.pageIndex;
    this.size = val.pageSize;
    this.data = this.productData.slice(
      val.pageIndex * val.pageSize,
      (val.pageIndex + 1) * val.pageSize
    );
  }

  addCart(item: any) {
    this.cartList.push(item);
    this.ecomServ.cartListSubject.next(this.cartList);
  }

  buyNow(item: any) {
    this.addCart(item);
    this.router.navigate(['/checkout']);
  }

  convertToNum(val: string) {
    return parseFloat(val.replace(',', ''));
  }
}
