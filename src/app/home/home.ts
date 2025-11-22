import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(public service: Api) {
    this.getAllCategories();
    this.getAllProducts();
    this.getAllBrands();
  }

  public allCategories:any;
  getAllCategories(){
    this.service.productsCategories().subscribe( (data:any) => {
      this.allCategories = data      
    })
  }

  pickCategory(catId:any){
    this.service.productsCat(catId).subscribe((data:any) => {
      this.allProducts = data.products
    })
  }

  public allProducts:any;
  getAllProducts(){
    this.service.productsAll().subscribe((data:any) => {
      this.allProducts = data.products
    })
  }

  public allBrands:any;
  getAllBrands(){
    this.service.productsBrands().subscribe((data:any) => { 
      this.allBrands = data;
    })
  }

  // public search:string = ""
  public keywords:string = ""
  public categoryId:string = ""
  public rating:string = ""
  public minPrice:string = ""
  public maxPrice:string = ""
  public selectedBrand:string = ""
  pickBrand(brand:any){
    this.selectedBrand = brand
  }

  filterProducts() {
    this.service.productsSearch(this.keywords, this.categoryId, this.selectedBrand, this.rating, this.minPrice, this.maxPrice).subscribe({
      next: (data:any) => this.allProducts = data.products
    })
  }
}
