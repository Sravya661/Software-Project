import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

userEmail = '';
userPassword = '';

  constructor (
    private popUpService : PopupService
  ){}



openHome() {
  if(this.userEmail === '' || this.userPassword ===''){
      this.popUpService.toast('Field cannot be left blank, Please try again.')
      
    }else{

    this.popUpService.toast('Suuces ful login');
    
  }
}


}

