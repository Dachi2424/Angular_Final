import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit, OnDestroy{
  constructor(public actr: ActivatedRoute, public service: Api){}

  ngOnInit() {
    this.getId()
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
  public rating!:number;
  getDetailedInfo() {
    this.service.productWithId(this.productId).pipe(takeUntil(this.destroy$)).subscribe( (data:any) => {
      this.product = data;
      this.rating = data.rating
      this.stars = new Array(Math.floor(this.rating))
      console.log(this.stars);
    })
  }

  public selectedImage:any = -1;
  setSelectedImage(index:any){
    this.selectedImage = index
  }

  
  
}
