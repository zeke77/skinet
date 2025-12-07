import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/models/Pagination';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../shared/custom-paginator-intl';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl,
    },
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  shopParams = new ShopParams();

  products = signal<Pagination<Product>>({
    count: 0,
    data: [],
    pageSize: 0,
    pageIndex: 0,
  });
  //products = signal<Product[]>([]);

  // products:  Product[] = [];
  // selectedBrands: string[] = [];
  // selectedTypes: string[] = [];
  // selectedSort: string = 'name';

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    // this.shopService.getProducts(
    //   this.selectedBrands,
    //   this.selectedTypes,
    //   this.selectedSort).subscribe({

    this.shopService.getProducts(this.shopParams).subscribe({
      // next: response => this.products = response.data,

      //    next: (response) => {
      //   const productArray = response.data || response;
      //  this.products.set(productArray);

      // Assuming 'response' is the object { count: 100, data: [...] }
      next: (response: Pagination<Product>) => {
        // Use .set() to replace the signal's value with the new, complete object
        this.products.set(response);

        //         // 3. Log the first element ONLY IF the array is not empty
        if (this.products().data.length > 0) {
          console.log('First Product Element:', this.products().data[0]);
        } else {
          console.log('The products array is empty.');
        }
      },
      error: (error) => console.log(error),
    });
  }
  //       next: (response) => {
  //         const productArray = response.data || response;
  //         this.products.set(productArray);
  //         // 3. Log the first element ONLY IF the array is not empty
  //         if (this.products().length > 0) {
  //           console.log('First Product Element:', this.products()[0]);
  //         } else {
  //           console.log('The products array is empty.');
  //         }
  //       },

  //       error: (error) => console.log(error),
  //     });
  // }

onSearchChange() {
  this.shopParams.pageNumber = 1;
  this.getProducts();
}

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }
  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];

    if (selectedOption) {
      // this.selectedSort = selectedOption.value;

      // console.log(this.selectedSort);
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogREf = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        // selectedBrands: this.selectedBrands,
        // selectedTypes: this.selectedTypes,
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      },
    });

    dialogREf.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          // console.log(result);
          // this.selectedBrands = result.selectedBrands;
          // this.selectedTypes = result.selectedTypes;

          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopParams.pageNumber = 1;

          this.getProducts();
        }
      },
    });

    // dialogREf.afterClosed().subscribe({
    //   next: (result) => {
    //     if (result) {
    //       // console.log(result);
    //       this.selectedBrands = result.selectedBrands;
    //       this.selectedTypes = result.selectedTypes;

    //       //apply filters
    //       this.shopService.getProducts(this.selectedBrands, this.selectedTypes).subscribe({
    //         next: (response) => {
    //           const productArray = response.data || response;
    //           this.products.set(productArray);
    //         },
    //         error: (error) => console.log(error),
    //       }); // <-- CLOSED inner subscription HERE
    //     } // <-- CLOSED if block HERE
    //   }, // <-- CLOSED next function HERE
    // }); // <-- CLOSED afterClosed subscription HERE
  }
}
