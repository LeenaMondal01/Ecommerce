import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { ProductComponent } from './product/product.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { EcomServService } from './service/ecom-serv.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LeftPanelComponent,
    ProductComponent,
    HomeComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatTableModule,
    RouterModule.forRoot(routes),
  ],
  providers: [EcomServService],
  bootstrap: [AppComponent],
})
export class AppModule {}
