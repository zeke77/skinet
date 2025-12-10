import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/Pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export  class ShopService {
  
 baseUrl = 'https://localhost:5001/api/';
 brandsUrl = this.baseUrl + 'products/brands';
 typesUrl = this.baseUrl + 'products/types';
 //pageRequest = 'products?pageSize=20';
 pageRequest = 'products';

 private http = inject (HttpClient);

 types: string[] = [];
 brands: string[] = [];

 // getProducts (brands?: string[], types?: string[], sort? : string) {
 getProducts (shopParams: ShopParams) {

  let params = new HttpParams();

  if ( shopParams.brands.length > 0)
  {
    params = params.append('brands',shopParams.brands.join(','));
  }
  
 if ( shopParams.types.length > 0)
  {
    params = params.append('types',shopParams.types.join(','));
  }

 if (shopParams.sort)
   {
     params = params.append('sort', shopParams.sort);
   }

if (shopParams.search)
   {
     params = params.append('search', shopParams.search);
   }


//   if ( brands && brands.length > 0)
//   {
//     params = params.append('brands',brands?.join(','));
//   }
  
//  if ( types && types.length > 0)
//   {
//     params = params.append('types',types?.join(','));
//   }

//  if (sort)
//    {
//      params = params.append('sort', sort);
//    }


  // params = params.append('pageSize',20);
  params = params.append('pageSize',shopParams.pageSize);
  params = params.append('pageIndex',shopParams.pageNumber);

  return this.http.get<Pagination<Product>>(this.baseUrl + this.pageRequest,{params});
 }

getProduct(id: number)
{
  const request = this.baseUrl + this.pageRequest + '/' + id;
  return this.http.get<Product>(request);
}

getBrands() {

  if ( this.brands.length > 0 ) return;

  return this.http.get<string[]>(this.brandsUrl).subscribe({
next: response => this.brands = response
  }) ;
}

getTypes() {

  if ( this.types.length > 0 ) return;

  return this.http.get<string[]>(this.typesUrl).subscribe({
next: response => this.types = response
  }) ;
}

}
