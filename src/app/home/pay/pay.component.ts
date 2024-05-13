import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../popup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  selectedOption: string = 'credit-card'; // Track the selected payment option
  Rent ='2000';
  constructor(
    private popUpService : PopupService
  ) { }

  ngOnInit(): void {
    // Initialize any component-specific logic here
  }

  makePayment(){
      console.log('Make payment is called ');
      this.popUpService.toast('Your payment was successfull');
  }
  selectPaymentOption(option: string): void {
    console.log('Payment is made by ',option)
    this.selectedOption = option;
  }
}
