import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit{
  constructor(public service: Api) {}

  ngOnInit(): void {
    this.getAllCart()
  }

  public productArray:any[] = []
  public cartProductsArray: any[] = []
  getAllCart(){
    this.service.cart().subscribe( (data:any) => {
      this.productArray = data.products;
      console.log("productArray:" ,this.productArray);

      // this.cartProductsArray = []
      
      this.productArray.forEach((item:any) => {
        this.service.productWithId(item.productId).subscribe((product:any) => {
          this.cartProductsArray.push(product)
        })
      })
      console.log("cartProductArray:", this.cartProductsArray);
    })
  }


  decreaseQuantity(id:any, quantity:any){
    let info = {
      id: id,
      quantity: quantity - 1
    }
    if(quantity > 1){
      this.service.updateCartProduct(info).subscribe({
        next: () => {console.log("successfully changed")},
        error: (err) => {console.log("fail:", err);}        
      })
    }  
  }

  increaseQuantity(id:any, quantity:any){
    let info = {
      id: id,
      quantity: quantity + 1
    }
    this.service.updateCartProduct(info).subscribe({
      next: () => {console.log("successfully changed")},
      error: (err) => {console.log("fail:", err);}        
    })
  }

}
