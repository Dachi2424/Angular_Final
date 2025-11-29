import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { Api } from '../services/api';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit{
  public productArray: any[] = []
  public cartProductsArray: any[] = []
  public totalPrice: number = 0;
  constructor(public service: Api, public router: Router) {}

  ngOnInit(): void {
    this.getAllCart()
  }

  getAllCart(){
    this.service.cart().subscribe({
      next:(data:any) => {
      this.productArray = data.products;
      // console.log("productArray:", this.productArray);
      
      // გაასუფთავე array თავიდან
      this.cartProductsArray = [];
      
      // შექმენი observable-ების array
      const productRequests = this.productArray.map((item: any) => 
        this.service.productWithId(item.productId).pipe(
          map((product: any) => ({
            ...product,
            cartQuantity: item.quantity, // დაამატე quantity cart-იდან
            productId: item.productId
          }))
        )
      );
      
      // forkJoin ელოდება ყველა request-ს და ინარჩუნებს თანმიმდევრობას
      forkJoin(productRequests).subscribe({
        next: (products: any[]) => {
          this.cartProductsArray = products;
          // console.log("cartProductArray:", this.cartProductsArray);
          this.calculateTotal()
        },
        error: (err) => {
          console.error("Error loading products:", err);
        }
      });
    },
    error: (err) => {console.log("no cart found")}
  })
  }

  calculateTotal() {  
    this.totalPrice = this.cartProductsArray.reduce((sum, product) => {
      const price = Number(product.price.current) || 0
      const quantity = Number(product.cartQuantity) || 0
      return sum + (price * quantity)
    }, 0)
    console.log(this.totalPrice);   
  }

  decreaseQuantity(productId: any, quantity: any){
    if(quantity > 1){
      let info = {
        id: productId,
        quantity: quantity - 1
      }
      // Update server then update both local arrays so future clicks use the new quantity
      this.service.updateCartProduct(info).subscribe({
        next: () => {
          // update cartProductsArray (UI)
          const product = this.cartProductsArray.find(p => p.productId === productId);
          if(product) {
            product.cartQuantity = quantity - 1;
          }

          // update the raw cart item array so the underlying quantity stays in sync
          const cartItem = this.productArray.find((p: any) => p.productId == productId);
          if(cartItem) cartItem.quantity = quantity - 1;
          this.calculateTotal()
        },
        error: (err) => {console.log("fail:", err);}        
      })
    }  
  }

  increaseQuantity(productId: any, quantity: any){
    let info = {
      id: productId,
      quantity: quantity + 1
    }
    // Update server and then synchronize local arrays
    this.service.updateCartProduct(info).subscribe({
      next: () => {

        // update cartProductsArray (UI)
        const product = this.cartProductsArray.find(p => p.productId === productId);
        if(product) {
          product.cartQuantity = quantity + 1;
        }

        // update the raw cart item array so next clicks keep correct base quantity
        const cartItem = this.productArray.find((p: any) => p.productId == productId);
        if(cartItem) cartItem.quantity = quantity + 1;
        this.calculateTotal()
      },
      error: (err) => {console.log("fail:", err);}        
    })
  }

  deleteItem(id:any){
    this.service.deleteCartId(id).subscribe({
      next: () => {
        this.getAllCart()
      },
      error: (err) => {console.log("not deleted(error)")}
    })
  }


  public emptyCartError: boolean = false

  public dissableCheckout!:boolean;
  checkoutCart(){
    if(this.productArray.length > 0){
      this.service.checkout().subscribe({
      next: () => {
        this.cartProductsArray = []
        this.productArray = []
        alert("checkout was successful! please come again!")
        this.router.navigate(['/'])
      },
      error: (err) => {
        const errorMessage = err.error?.error || ''
        if(errorMessage.includes("Token not found")){
          this.dissableCheckout = true
        }
      }
    })
  }  
  else {
    this.emptyCartError = true
  }
  }
}
