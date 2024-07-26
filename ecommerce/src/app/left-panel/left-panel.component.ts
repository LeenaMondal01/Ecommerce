import { Component } from '@angular/core';
import { EcomServService } from '../service/ecom-serv.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent {
  min: number = 0;
  max: number = 100;
  a: number = 0;
  b: number = 100;

  data: any;
  brand: String[] = [];
  ind: number[] = [];

  constructor(private ecomServ: EcomServService) {
    ecomServ.filterSubject.subscribe((e) => {
      this.data = e;
      this.brand = [];
      ecomServ.brandsSubject.subscribe((b) => {
        this.brand = b;
      });
    });

    ecomServ.minValSubject.subscribe((e: number) => {
      this.min = e;
      this.a = e;
    });

    ecomServ.maxValSubject.subscribe((e: number) => {
      this.max = e;
      this.b = e;
    });
  }

  priceVal() {
    this.ecomServ.filterByPrice(this.a, this.b);
  }

  brandChange(i: number) {
    if (this.ind.includes(i)) {
      let xyz = this.ind.indexOf(i);
      this.ind.splice(xyz, 1);
    } else {
      this.ind.push(i);
    }

    let temp: String[] = [];
    for (let ele of this.ind) {
      temp.push(this.brand[ele]);
    }
    this.ecomServ.filterByBrand(temp);
  }
}
