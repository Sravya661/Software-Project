import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../popup.service';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit{
  selectedOption: string = 'credit-card'; // Track the selected payment option
  loggedIn!:any;

  constructor(
    private popUpService : PopupService,
    private route : Router
  ) { }
  ngOnInit(): void {
    //sanitization
    if (typeof window === 'undefined') {
      this.loggedIn = false;
      this.popUpService.toast('Please login first');
      this.route.navigate(['/']);

  }else{
        this.loggedIn = localStorage.getItem('session');
        if(this.loggedIn === 'false'){
            this.popUpService.toast('Please login first');
            this.route.navigate(['/']);
        }
  }

  }


  makePayment(){
      this.popUpService.toast('Your payment was successfull');
      this.route.navigate(['/home']);
  }
  selectPaymentOption(option: string): void {
    this.selectedOption = option;
  }

}
