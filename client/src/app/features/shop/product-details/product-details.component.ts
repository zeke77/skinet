import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatDividerModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);

   product = signal<Product | null>(null);

  ngOnInit() {

    this.loadProduct();
  }

  loadProduct(): void {

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

     if ( ! id) return;

      this.shopService.getProduct(id).subscribe(p => {
    this.product.set(p) ; // ✅ now Angular detects the change
  });
}
    //  this.shopService.getProduct(id).subscribe({
    //  next: product => {
    //    this.product = product;
    //    console.log('Product Name:', product.name);
    //    // 3. Log the component property (confirms assignment worked)
    //   console.log('Component property (this.product) value:', this.product);
    //  },
    //  error: error => console.log(error)
    //  })
  //}

}
