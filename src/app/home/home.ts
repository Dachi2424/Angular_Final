import { Component } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(public service: Api) {
    this.getAllCategories();
    this.getAllProducts();
  }

  public allCategories:any;
  getAllCategories(){
    this.service.productsCategories().subscribe( (data:any) => {
      this.allCategories = data      
    })
  }

  public allProducts:any;
  getAllProducts(){
    this.service.productsAll().subscribe((data:any) => {
      this.allProducts = data.products
    })
  }
}
