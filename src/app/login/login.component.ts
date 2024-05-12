import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCode: any;


  userEmail = '';
  userPassword = '';
  pass = '';
  passConfirm = '';
  signUpPage = false;
  loginpage = true;
  passwordPage = false;

  constructor(
    private popUpService: PopupService
  ) { }



  openHome() {
    if (this.userEmail === '' || this.userPassword === '') {
      this.popUpService.toast('Fields cannot be left blank, Please try again.')

    }
     else if(!this.isValidEmail(this.userEmail)){
      this.popUpService.toast('Invalid Email, Please try Again!')
    }
    else {
      this.popUpService.toast('Suucessful login');

    }
  }

  sendOTP() {
    if(this.isValidEmail(this.userEmail)){
      //call the sendOTPApi
    }
    else{
      this.popUpService.toast('Invalid Email, Please try Again!')
    }
  }

  setPassword(){
    if(this.pass === '' || this.passConfirm === ''){
        this.popUpService.toast('Fields cannot be left left blank');
    }
    else if(!(this.pass === this.passConfirm)){
        this.popUpService.toast("Password doesn't match, Please try again!")
    }
    else{
      //api to change password and reset password and want to add regex for password
      this.popUpService.toast('Password has been set successfully');
      this.passwordPage = false;
      this.signUpPage = false;
      this.loginpage = true;
    }
  }


  openLogin() {
    this.userCode = '';
    this.userEmail = '';
    this.signUpPage = false;
    this.passwordPage = false;
    this.loginpage = true;
  }
  openSignUp() {
    this.userEmail = '';
    this.userPassword = '';
    this.userCode = ''
    this.loginpage = false;
    this.signUpPage = true;
    this.passwordPage  = false;
  }

  verify() {
    if(this.containsSixDigitNumber(this.userCode)){
        //match the with received code
        this.openPassword();
    }
    else{
      this.popUpService.toast('Invalid OTP, Please try again.')
    }
  }

  openPassword(){
    this.pass = '';
    this.passConfirm = '';
    this.signUpPage =false;
    this.loginpage  = false;
    this.passwordPage = true;

  }
  containsSixDigitNumber(inputString: string): boolean {
    const regexPattern = /^\d{6}$/; // Regex pattern to match exactly 6 digits

    return regexPattern.test(inputString);
  }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }



}

