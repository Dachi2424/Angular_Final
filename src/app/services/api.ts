import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { min } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api: HttpClient) {

  }

  //products
  productsAll(pageIndex:any, pageSize:any){
    return this.api.get(`https://api.everrest.educata.dev/shop/products/all?page_index=${pageIndex}&page_size=${pageSize}`)
  }

  productWithId(id:any){
    return this.api.get(`https://api.everrest.educata.dev/shop/products/id/${id}`)
  }

  productsSearch(pageIndex:any, keywords:any, categoryId:any, selectedBrands:any, rating:any, minPrice:any, maxPrice:any) {
    let url = `https://api.everrest.educata.dev/shop/products/search?page_index=${pageIndex}&page_size=16`
    if (keywords) url += `&keywords=${keywords}`
    if (categoryId) url += `&category_id=${categoryId}`
    if (selectedBrands) url += `&brand=${selectedBrands}`
    if (rating) url += `&rating=${rating}`
    if (minPrice) url += `&price_min=${minPrice}`
    if (maxPrice) url += `&price_max=${maxPrice}`
    return this.api.get(url)
  }

  productsBrands() {
    return this.api.get("https://api.everrest.educata.dev/shop/products/brands")
  }

  productsCategories() {
    return this.api.get("https://api.everrest.educata.dev/shop/products/categories")
  }

  productsCat(category:any){
    return this.api.get(`https://api.everrest.educata.dev/shop/products/category/${category}?page_index=1&page_size=16`)
  }


  //auth

  signUp(body:any){
    return this.api.post("https://api.everrest.educata.dev/auth/sign_up", body)
  }
}
