import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  constructor(public actr: ActivatedRoute, public service: Api){
    this.getId()
    this.getDetailedInfo()
  }

  public productId:any;
  getId() {
    this.actr.queryParams.subscribe( (data:any) => {
      this.productId = data['id']
    })
  }
  public product:any;
  getDetailedInfo() {
    this.service.productWithId(this.productId).subscribe( (data:any) => {
      this.product = data
    })
  }
}
