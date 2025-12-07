import { Component, Input, input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard, MatCardContent, 
    CurrencyPipe, MatCardActions, 
    MatButton, MatIconModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;
}
