import { HttpClient } from '@angular/common/http';
import { Component, inject, ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-test-error',
  imports: [
    MatButton
  ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss',
})
export class TestErrorComponent {

   baseUrl = 'https://localhost:5001/api/';
 brandsUrl = this.baseUrl + 'products/brands';
 typesUrl = this.baseUrl + 'products/types';
 //pageRequest = 'products?pageSize=20';
 pageRequest = 'products';

 private http = inject (HttpClient);

 validationErrors?: string[];

 constructor(private cdr: ChangeDetectorRef){}

get404Error() {
  this.http.get(this.baseUrl + 'buggy/notfound').subscribe({
    next: response => console.log(response),
    error: error => console.log(error)
  })
}

get400Error() {
  this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
    next: response => console.log(response),
    error: error => console.log(error)
  })
}

get401Error() {
  this.http.get(this.baseUrl + 'buggy/unauthorized').subscribe({
    next: response => console.log(response),
    error: error => console.log(error)
  })
}

get500Error() {
  this.http.get(this.baseUrl + 'buggy/internalerror').subscribe({
    next: response => console.log(response),
    error: error => console.log(error)
  })
}

get404ValidationError() {
  this.http.post(this.baseUrl + 'buggy/validationerror',{}).subscribe({
    next: response => console.log(response),
    // error: error => console.log(error)
    error: error => {
      this.validationErrors = error;
      this.cdr.detectChanges();
     
    }
  })
}




}
