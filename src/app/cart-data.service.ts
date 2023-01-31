import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  constructor() {
    // If previous data is present in local storage, then take the cart data from there.
    if(localStorage.getItem('cartIdList')){
      let tempStr: any = localStorage.getItem('cartIdList');
      this.cartIdList = [...JSON.parse(tempStr)];
    }
    if(localStorage.getItem('cartList')){
      let tempStr: any = localStorage.getItem('cartList');
      this.cartList = [...JSON.parse(tempStr)];
    }
    if(localStorage.getItem('totalUsersList')){
      let tempStr: any = localStorage.getItem('totalUsersList');
      this.totalUsersList = [...JSON.parse(tempStr)];
    }
    if(localStorage.getItem('currentUserDetails')){
      let tempStr: any = localStorage.getItem('currentUserDetails');
      this.currentUserDetails = {...JSON.parse(tempStr)};
    }
    if(localStorage.getItem('isLoggedIn')){
      let tempStr: any = localStorage.getItem('isLoggedIn');
      this.isLoggedIn = JSON.parse(tempStr)=== 'true';
    }
  }

  isListPage: boolean = false;
  isLoggedIn: boolean = false;
  shortName = '';

  cartList: any = [];
  cartIdList: any = [];
  totalUsersList: any = [];
  currentUserDetails: any = {};
}
