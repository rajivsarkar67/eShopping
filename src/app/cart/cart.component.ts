import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../cart-data.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartDataService: CartDataService, private _snackBar: MatSnackBar, private router: Router) {
    this.cartDataService.isListPage = false;
  }

  ngOnInit(): void {
    if(!Object.keys(this.cartDataService.currentUserDetails).length){
      this.router.navigate(['login']);
    }
    else{
      this.getShortName(this.cartDataService?.currentUserDetails?.userName);
    }
  }

  deleteItemFromCart(i: any){
    // Deleting item from the cartList
    this.cartDataService.cartIdList.splice(i, 1);
    this.cartDataService.cartList.splice(i, 1);

    // Persisting item in local Storage
    localStorage.setItem('cartList', JSON.stringify(this.cartDataService.cartList))
    localStorage.setItem('cartIdList', JSON.stringify(this.cartDataService.cartIdList))
  }

  openSnackBar() {
    // Empty the cartList and store in local storage
    this.cartDataService.cartList = [];
    this.cartDataService.cartIdList = [];
    localStorage.setItem('cartList', JSON.stringify(this.cartDataService.cartList))
    localStorage.setItem('cartIdList', JSON.stringify(this.cartDataService.cartIdList))
    this._snackBar.open('Items Ordered🙌', '', {duration: 2000});
  }

  // To get the avatar name
  getShortName(fullName: string){
    let tempArr = fullName.split(' ');
    if(tempArr.length === 1){
      this.cartDataService.shortName = tempArr[0].charAt(0).toUpperCase();
    }
    if(tempArr.length > 1){
      this.cartDataService.shortName = (tempArr[0]).charAt(0).toUpperCase() + (tempArr[tempArr.length-1]).charAt(0).toUpperCase();
    }
  }
  
}
