import { Component, OnDestroy } from '@angular/core';
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
export class PayComponent {
  selectedOption: string = 'credit-card'; // Track the selected payment option
  Rent ='2000';


  constructor(
    private popUpService : PopupService,
    private route : Router
  ) { }


  makePayment(){
      this.popUpService.toast('Your payment was successfull');
      this.route.navigate(['/home']);
  }
  selectPaymentOption(option: string): void {
    this.selectedOption = option;
  }

}
