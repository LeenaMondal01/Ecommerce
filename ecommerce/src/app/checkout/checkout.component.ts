import { Component } from '@angular/core';
import { EcomServService } from '../service/ecom-serv.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: any;
  name: string;
  position: number;
  quantity: number;
  mrp: number;
  price: number;
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // Initial data as before
];

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'quantity',
    'mrp',
    'price',
    'total',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  totalAmount = 0;

  constructor(private ecomServ: EcomServService, private router: Router) {
    this.ecomServ.cartListSubject.subscribe((e) => {
      let updatedData = this.dataSource.data.slice(); // Create a copy of the current dataSource data

      for (let item of e) {
        let ind = -1;
        for (let i = 0; i < updatedData.length; i++) {
          if (updatedData[i].id == item['Uniq Id']) {
            ind = i;
            break;
          }
        }

        if (ind == -1) {
          updatedData.push({
            id: item['Uniq Id'],
            position: updatedData.length + 1,
            name: item['Product Title'],
            quantity: 1,
            mrp: item.Mrp,
            price: item.Price,
            total: parseFloat(item.Price),
          });
        } else {
          let q = updatedData[ind].quantity + 1;
          let total = updatedData[ind].price * q;
          updatedData[ind] = {
            ...updatedData[ind],
            quantity: q,
            total: total,
          };
        }

        this.totalAmount += parseFloat(item.Price);
      }

      this.dataSource.data = updatedData;
    });
  }

  clickEvent() {
    this.router.navigate(['/home']);
  }

  changeQuantity(id: any, flag = true) {
    let updatedData = this.dataSource.data.slice();

    for (let ind = 0; ind < updatedData.length; ind++) {
      if (updatedData[ind].id == id) {
        if (updatedData[ind].quantity == 0 && !flag) {
          return;
        }
        let q = flag
          ? updatedData[ind].quantity + 1
          : updatedData[ind].quantity - 1;
        let total = updatedData[ind].price * q;
        updatedData[ind] = {
          ...updatedData[ind],
          quantity: q,
          total: total,
        };
        this.totalAmount += flag
          ? parseFloat(updatedData[ind].price.toString())
          : -parseFloat(updatedData[ind].price.toString());
      }
    }

    this.dataSource.data = updatedData;
  }
}
