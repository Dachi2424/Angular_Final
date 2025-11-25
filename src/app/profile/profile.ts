import { Component } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor(private service: Api) {
    this.showMyInfo()
  }

  public userInfo:any;
  showMyInfo() {
    this.service.auth().subscribe( (data:any) => {
      this.userInfo = data
      console.log(this.userInfo);
    })
  }
}
