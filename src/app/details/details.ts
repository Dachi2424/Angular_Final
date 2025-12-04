import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [RouterLink, FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit, OnDestroy{
  constructor(public actr: ActivatedRoute, public service: Api, public cookie: CookieService){}

  ngOnInit() {
    this.getId()
    
  }

  deleteCart(){
    this.service.deleteWholeCart().subscribe()
  }

  private destroy$ = new Subject<void>();
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  public productId:any;
  getId() {
    this.actr.queryParams.pipe(takeUntil(this.destroy$)).subscribe( (data:any) => {
      this.productId = data['id'];
      this.getDetailedInfo()
    })
  }

  public product:any;
  public stars:any;
  public rating!: number;
  getDetailedInfo() {
    this.service.productWithId(this.productId).pipe(takeUntil(this.destroy$)).subscribe( (data:any) => {
      this.product = data;
      this.rating = data.rating
      this.stars = new Array(Math.floor(this.rating))
    })
  }

  public selectedImage:any = -1;
  setSelectedImage(index:any){
    this.selectedImage = index
  }

  //cart functions

  getAllCart(){
    this.service.cart().subscribe({
      next: (data:any) => {console.log(data)},
      error: (err:any) => {console.log("error: ", err)}
    })
  }

  public authorizedCart:boolean = true;
  cartButton(id:any){
    if(this.cookie.check("user")){
      this.addToCart(id)   
    } 
    else if(!this.cookie.check("user")){
      this.authorizedCart = false
    }
    return
  }

  decreaseQuantity(quantity:any){
    if(quantity > 1){
      quantity--
      this.productQuantity = quantity
    }
  }

  increaseQuantity(quantity:any){
    quantity++
    this.productQuantity = quantity
  }

  public addToCartErrorText!:string;
  public addToCartSuccessText!:string;
  public productQuantity: any = 1;
  addToCart(id:any){
    let info = {
      id: id,
      quantity: this.productQuantity
    }
    console.log("addToCart function");
    this.service.addNewCartProduct(info).subscribe({
      next:(data:any) =>  {
        console.log(data) 
        this.addToCartSuccessText = "Product Successfully added to cart! go to checkout"
      },
      error:(err) =>  {
        if((err.error.error)?.includes("use patch")){
          this.service.updateCartProduct(info).subscribe({
            next: (data:any) => {
              console.log("patch works:",data);
              this.addToCartSuccessText = "Product Successfully added to cart! go to checkout"
            },
            error: (patchErr) => {
              this.addToCartErrorText = patchErr.error.error
            }
          })
        }
        else{
          this.addToCartErrorText = err.error.error
        }
      }
    })
  }


  

  showRate(){
    
  }

  public ratingInput!:number;
  public ratingError!:boolean;
  makeRate(){
    if(this.ratingInput >= 0 && this.ratingInput <= 5){
      let info = {
        productId: this.productId,
        rate: this.ratingInput
      }
      this.service.rateProduct(info).subscribe({
        next: (data:any) => {console.log("success", data)},
        error: (err) => {console.log("error", err)},
        complete: () => {this.ratingError = false}
      })
    }
    else{
      this.ratingError = true;
    }    
  }
}
