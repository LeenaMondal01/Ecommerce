import { Component, OnInit } from '@angular/core';
import { EcomServService } from '../service/ecom-serv.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  cartList: any[] = [];
  cartItemLen = 0;

  constructor(private ecomServ: EcomServService, private router: Router) {
    this.options = ecomServ.prodList;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.ecomServ.cartListSubject.subscribe((ele) => {
      this.cartList = ele;
      this.cartItemLen = this.cartList.length;
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  filter() {
    this.ecomServ.filterBySearch(this.myControl.value?.toLocaleLowerCase());
  }

  navigateCart() {
    this.router.navigate(['/checkout']);
  }
}
