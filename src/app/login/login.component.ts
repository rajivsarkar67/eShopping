import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CartDataService } from '../cart-data.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private cartDataService: CartDataService,
              private _snackBar: MatSnackBar) {
    this.cartDataService.isListPage = false;
  }

  ngOnInit(): void {
    if(Object.keys(this.cartDataService.currentUserDetails).length){
      this.router.navigate(['list']);
    }
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  logIn(){
    if(this.email.valid && this.password.valid){
      // Find if email is there or not in the totalUsersList
      let currentUser = this.cartDataService.totalUsersList?.filter((el: { userEmail: string | null; }) => el.userEmail === this.email.value);
      console.log(currentUser);
      if(currentUser.length){
        // If email is there in totalUsersList, check if the password is correct
        if(currentUser[0].userPassword === this.password.value){
          // If password is also correct, save detail in currentUserDetails and store in local storage
          this.cartDataService.currentUserDetails = currentUser[0];
          localStorage.setItem('currentUserDetails', JSON.stringify(this.cartDataService.currentUserDetails));
          this.cartDataService.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', JSON.stringify(this.cartDataService.isLoggedIn));

          this._snackBar.open('Successfully logged In! 😀','',{duration: 2000});
          this.router.navigate(['list']);
        }
        else{
          // If password is not correct
          this._snackBar.open('Password is not correct😓','',{duration: 2000});
        }
      }
      else{
        // If user email entered is not there
        this._snackBar.open('User with this Email ID is not there!😢', '', {duration: 2000});
      }
    }
  }

  navigateToSignup(){
    this.router.navigate(['signup']);
  }
}
