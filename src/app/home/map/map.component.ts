import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../../popup.service';
import { CallApiService } from '../../call-api.service';
import { error } from 'console';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [

  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{


  loggedIn! : any;

  constructor(
    private route : Router,
    private popUpService : PopupService,
    private callApiService : CallApiService
  ){}
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

  this.callApiService.updateMap().then(data=>{
     console.log(data);
  }).catch(error=>{
      this.popUpService.toast("Could't update map. in ngONnit")
  })

  }


openHome() {
    this.route.navigate(['/home']);

}

}
