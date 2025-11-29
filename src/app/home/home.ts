import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedIn } from '../services/logged-in';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(public service: Api, private router: Router, private renderer: Renderer2) {
    this.getAllCategories();
    this.getAllProducts();
    this.getAllBrands();
  }
  

  public allProducts:any;
  public currentPage:number = 1;
  public totalPages!:number;
  public loopXTimes:number[] = []
  getAllProducts(){
    this.service.productsAll(this.currentPage, 16).subscribe((data:any) => {
      this.totalPages = Math.ceil(data.total / data.limit)
      this.loopXTimes = Array(this.totalPages).fill(0);      
      this.allProducts = data.products
    })
  }

  changePage(page:any){
    this.currentPage = page
    this.getAllProducts()
  }

  reducePage(){
    if(this.currentPage > 1){     
      this.currentPage--
      this.getAllProducts()
    }
  }

  increasePage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++
      this.getAllProducts()
    }
  }

  public allCategories:any;
  getAllCategories(){
    this.service.productsCategories().subscribe( (data:any) => {
      this.allCategories = data      
    })
  }

  public pickedCategory:any = -1;
  pickCategory(catId:any, index:any){
    this.pickedCategory = index  
    this.service.productsCat(catId).subscribe((data:any) => {
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
    this.service.productsSearch(this.currentPage, this.keywords, this.categoryId, this.selectedBrand, this.rating, this.minPrice, this.maxPrice).subscribe({
      next: (data:any) => this.allProducts = data.products
    })
  }


  goToDetails(productId:any){   
    this.router.navigate(['/details'], {queryParams: {id: productId}})
  }

  public showFilter:boolean = false;
}
