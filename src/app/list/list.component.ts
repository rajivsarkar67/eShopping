import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../cart-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private cartDataService: CartDataService, private router: Router) {
    this.cartDataService.isListPage = true;
  }

  ngOnInit(): void {
    if(!Object.keys(this.cartDataService.currentUserDetails).length){
      this.router.navigate(['login']);
    }
    else{
      this.getShortName(this.cartDataService?.currentUserDetails?.userName);
    }
  }

  productsList = [{name: 'Mouse', image: 'assets/mouse.jpg', description: 'Mouse is used to conveniently use a laptop.'},
                  {name: 'Keyboard', image: 'assets/keyboard.jpg', description: 'Keyboard is used to type smoothly staying away from the laptop.'},
                  {name: 'Laptop', image: 'assets/laptop.jpg', description: 'Laptop is the main thing which can help you earn money.'},
                  {name: 'Mouse Pad', image: 'assets/mouse_pad.jpg', description: 'Mouse pad is used to place mouse so that it can navigate smoothly.'},
                  {name: 'Earphone', image: 'assets/earphone.jpg', description: 'Earphone is used to easily speak with other people and hear them.'}];

  addItemToCart(item: any, i: any){
    if(this.cartDataService.cartIdList.indexOf(i) === -1){
      // Inserting item only if item is already not there
      this.cartDataService.cartList.push(item);
      this.cartDataService.cartIdList.push(i);

      // Adding item to localStorage
      localStorage.setItem('cartList', JSON.stringify(this.cartDataService.cartList))
      localStorage.setItem('cartIdList', JSON.stringify(this.cartDataService.cartIdList))
    }
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
