export class ShopParams {

  brands: string[] = [];
  types: string[] = [];
  sort = 'name';
  pageNumber = 1;
  pageSize = 10;
  search = '';
 pageSizeOptions: number[]=[5, 10, 15, 20]  
}