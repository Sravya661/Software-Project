import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopupService } from '../popup.service';
import { CallApiService } from '../call-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  



  userEmail = '';
  userPassword = '';
  userCode ='';
  pass = '';
  passConfirm = '';
  signUpPage = false;
  loginpage = true;
  passwordPage = false;
  sentCode ='';
  sendOTPDisabled = false;
  forgotPassword = false;

  constructor(
    private popUpService: PopupService,
    private callApiService : CallApiService,
    private route : Router
  ) { }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('session', 'false');
    }
  }



  async openHome() {
        if (this.userEmail === '' || this.userPassword === '') {
          this.popUpService.toast('Fields cannot be left blank, Please try again.')

        }
        else if(!this.isValidEmail(this.userEmail)){
          this.popUpService.toast('Invalid Email, Please try Again!')
        }
          else if(this.userPassword.length<6){
            this.popUpService.toast('Password should be of atleat 6 characters')
          }
        
        else {
          //call the login api 
          // start  the service session 

          const msg = await this.callApiService.login(this.userEmail, this.userPassword);
          if (msg === 'Login successful') {
            // this.callApiService.session = true;
            localStorage.setItem('session', 'true');
            this.route.navigate(['/home']);
          }

        }
    }

  async sendOTP() {
    if(this.isValidEmail(this.userEmail)){
        this.sendOTPDisabled = true;
        setTimeout(() => {
          this.sendOTPDisabled = false;
        }, 10000);
          const response = await this.callApiService.sendOTP(this.userEmail);
          if(response!==undefined){
            this.sentCode = response;
          }
    }
    else{
      this.popUpService.toast('Invalid Email, Please try Again!')
    }
  }

  async setPassword(){
    if(this.pass === '' || this.passConfirm === ''){
        this.popUpService.toast('Fields cannot be left left blank');
    }
    else if(!this.containsSixDigitNumber(this.pass)){
        this.popUpService.toast('Password  should be of atleast 6 charaters.');
    }
    else if(!(this.pass === this.passConfirm)){
        this.popUpService.toast("Password doesn't match, Please try again!")
    }
    else{
         //api to change password and reset password and want to add regex for password

      if(this.forgotPassword){
        const msg = await this.callApiService.updatePassoword(this.userEmail,this.passConfirm);
        if((msg === 'Password updated successfully') || (msg==='User not found')){
          this.route.navigate(['/']);
        }else{
          this.popUpService.toast('Failed to update password.')
        }
      }
      else{
        const msg = await this.callApiService.createUser(this.userEmail,this.pass);
        if(msg === "Email already exists"){
            this.popUpService.toast('Account already exists, please login.');
            this.route.navigate(['/']);
        }
      }
      
      this.reset();
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
    if(this.containsSixDigitNumber(this.userCode) && this.sentCode ===this.userCode){
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
    const regexPattern = /\d{6,}/; // Regex pattern to match at least 6 digits
  
    return regexPattern.test(inputString);
  }
  // containsSixDigitNumber(inputString: string): boolean {
  //   const regexPattern = /^\d{6}$/; // Regex pattern to match exactly 6 digits

  //   return regexPattern.test(inputString);
  // }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  reset(){
    this.userEmail = '';
    this.userPassword = '';
    this.userCode ='';
    this.pass = '';
    this.passConfirm = '';
  }


}

