import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  // session  = false;
  constructor(
    private popUpService : PopupService
  ) { }

  
  async sendOTP(email: string): Promise<string | undefined> {
    try {
      const response = await axios.post('http://localhost:3000/sendOTP', {email : email});
      const otp = response.data.Otp?.toString();
      this.popUpService.toast('OTP has been sent Successfully.','Dismiss');
      console.log('OTP sent is ',otp);
      return otp;
    } catch (error) {
      this.popUpService.toast('OTP not sent, Please try again later.','Dismiss');  
      return undefined; 
    }
  }

  async login(email: string, password: string): Promise<string | undefined> {
    try {
        const response = await axios.post('http://localhost:3000/login', { email: email, password: password });
        const msg = response.data.msg;
          if (msg === 'Login successful'){
            this.popUpService.toast("Logged in");
          }
          else if (msg === 'User does no exist!') {
            this.popUpService.toast("No account with this email exists, Please create a account.");
          }
          else if(msg === 'Password does not match!'){
            this.popUpService.toast("Invalid Password");
          }
        console.log("msg in api response ",msg);
        return msg;
          
      } catch (error) {
        this.popUpService.toast("Not able to verify account, please try again later!");
        return undefined;
      }
    }


  async createUser(email: string, password: string): Promise<string | undefined> {
    try {
        const response = await axios.post('http://localhost:3000/create_user', { email: email, password: password });

        const msg = response.data.msg;
          if (msg === 'Email already exists'){
            this.popUpService.toast("User Acount already exists, please login.");
          }
          if( msg === 'Success'){
              this.popUpService.toast('Account has been created successfully.')
          }
        return msg;

      } catch (error) {
        this.popUpService.toast("Not able to create account, try again later.");
        return undefined;
      }
    }

  async updatePassoword(email: string, newPassword: string): Promise<string | undefined> {
    try {
        const response = await axios.post('http://localhost:3000/update_password', { email: email, newPassword: newPassword });

        const msg = response.data.msg;
          if (msg === 'Password updated successfully'){
            this.popUpService.toast("Password updated successfully.");
          }
        else if(msg === 'User not found'){
            this.popUpService.toast('User not found.');
        }
        return msg;

      } catch (error) {
        this.popUpService.toast("Failed to update password.");
        return undefined;
      }
    }




  async fetchProperties() : Promise<any>{
    try {
     const response = await axios.get('http://localhost:3000/property_list');
     return response.data;
    } catch (error) {
        this.popUpService.toast('Data not available! Please try Again Later');
        return [];
    }
  }


  async fetchType() : Promise<any>{
    try {
     const response = await axios.get('http://localhost:3000/property_types');
     return response.data;
    } catch (error) {
        this.popUpService.toast('Cannot fetch Property Type! Please try Again Later');
        return [];
    }
  }

  async fetchRange() : Promise<any>{
    try {
     const response = await axios.get('http://localhost:3000/range');
     return response.data;
    } catch (error) {
        this.popUpService.toast('Cannot fetch Range! Please try Again Later');
        return [];
    }
  }

  async fetchRooms() : Promise<any>{
    try {
     const response = await axios.get('http://localhost:3000/rooms');
     return response.data;
    } catch (error) {
        this.popUpService.toast('Cannot fetch no of Bedrooms! Please try Again Later');
        return [];
    }
  }

  async fetchLocation() : Promise<any>{
    try {
     const response = await axios.get('http://localhost:3000/location');
     return response.data;
    } catch (error) {
        this.popUpService.toast('Cannot fetch no of Location! Please try Again Later');
        return [];
    }
  }




}
