import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopupService } from '../popup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items$!: Observable<any[]>;
  data = [];
  userEmail = '';

  constructor(
    private http: HttpClient,
    private popUpService : PopupService,
    private snackBar : MatSnackBar
  ){ }


  ngOnInit(): void {
    this.userEmail = 'choudhary98akash@gmal.com'
    // this.items$ = [];
    // Fetch data from your API (replace 'apiUrl' with your backend endpoint)
    // this.items$ = this.http.get<any[]>('apiUrl').pipe(
    //   map(response => response.data) // Assuming your API response contains an array of data
    // );
  }

  logout() {
    const snackBarRef = this.snackBar.open('Are you sure you want to logout?', 'Yes', {
      duration: 5000 });
    snackBarRef.onAction().subscribe(() => {
      console.log('User confirmed logout. Implement logout logic here.');
    });
  }
}
