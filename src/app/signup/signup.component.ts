import { Component, OnInit } from '@angular/core';
import {Validators, FormControl} from '@angular/forms';
import { CartDataService } from '../cart-data.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private cartDataService: CartDataService,
              private _snackBar: MatSnackBar) {
    this.cartDataService.isListPage = false;
  }

  ngOnInit(): void {
    if(Object.keys(this.cartDataService.currentUserDetails).length){
      this.router.navigate(['list']);
    }
  }

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  signUp(){
    if(this.name.valid && this.email.valid && this.password.valid){
      // Pushing user data to totalUsersList array and storing it in local storage
      this.cartDataService.totalUsersList.push({userName: this.name.value, userEmail: this.email.value, userPassword: this.password.value});
      localStorage.setItem('totalUsersList', JSON.stringify(this.cartDataService.totalUsersList));
      // Showing snackbar and navigating to login page
      this._snackBar.open('User successfully created!☺', '', {duration: 2000});
      this.router.navigate(['login']);
    }
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

}
