import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CartDataService } from './cart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router, public cartDataService: CartDataService){
    this.cartDataService.isListPage = true;
    if(Object.keys(this.cartDataService.currentUserDetails).length){
      this.cartDataService.isLoggedIn = true;
      // this.getShortName(this.cartDataService?.currentUserDetails?.userName);
    }
  }
  
  // fullName = 'Rajib Sarkar';
  
  ngOnInit(){

  }

  // isLoggedIn: boolean = true;
  // shortName = '';

  navigateToCart(){
    this.router.navigate(['cart']);
  }

  navigateToList(){
    // First check if user is loggedIn and not on the Cart page
    if(this.cartDataService.isLoggedIn && !this.cartDataService.isListPage){
      this.router.navigate(['list']);
    }
  }

  clearCartAndLogout(){
    // Resetting the variables
    this.cartDataService.isLoggedIn = false;
    this.cartDataService.cartList = [];
    this.cartDataService.cartIdList = [];
    this.cartDataService.currentUserDetails = {};

    // Storing the resetted variables in localStorage
    localStorage.setItem('isLoggedIn', JSON.stringify(this.cartDataService.isLoggedIn));
    localStorage.setItem('cartList', JSON.stringify(this.cartDataService.cartList));
    localStorage.setItem('cartIdList', JSON.stringify(this.cartDataService.cartIdList));
    localStorage.setItem('currentUserDetails', JSON.stringify(this.cartDataService.currentUserDetails));

    // Routing to login page
    this.router.navigate(['login']);
  }
}
