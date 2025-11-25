import { Component, inject, OnInit, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/Pagination';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  baseUrl = 'https://localhost:5001/api/'
private http = inject (HttpClient);

  // protected readonly title = signal('client');
  title = 'SkiNet 2025-2026';
  products  = signal<Product[]>([]);

  ngOnInit(): void {
    
    this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
      next: response =>
        {
           // let productArray: any[] = [];
           const productArray = response.data || response;
            this.products.set(productArray);
            // 3. Log the first element ONLY IF the array is not empty
        if (this.products().length > 0) {
            console.log('First Product Element:', this.products()[0]);
        } else {
            console.log('The products array is empty.');
      }
    },

      error: error => console.log(error),
      complete: () => console.log('complete')
    })
  }
}