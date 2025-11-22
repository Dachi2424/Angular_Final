import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api: HttpClient) {

  }

  //products
  productsAll(){
    return this.api.get(`https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=16`)
  }

  productsSearch() {
    return this.api.get(`https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=16&brand=asus&rating=3&price_min=100&price_max=600`)
  }

  productsCategories() {
    return this.api.get("https://api.everrest.educata.dev/shop/products/categories")
  }
}
