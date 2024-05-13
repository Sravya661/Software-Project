import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopupService } from '../popup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dir } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  items$!: Observable<any[]>;
  data = [];
  propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Duplex', 'Penthouse', 'Cottage', 'Bungalow', 'Farmhouse'];
  locations = ['City Center', 'Suburbs', 'Beachfront', 'Mountain View', 'Lakefront', 'Rural', 'Gated Community', 'Downtown'];
  noOfRooms = ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms'];
  priceRanges = ['Under $100,000', '$100,000 - $200,000', '$200,000 - $300,000', '$300,000 - $400,000', '$400,000 - $500,000', 'Over $500,000'];
  selectedPropertyType: string = '';
  selectedLocation: string = '';
  selectedNumRooms: string = '';
  selectedPriceRange: string = '';
  searchText: string = '';
  userEmail = '';

  constructor(
    private popUpService: PopupService,
    private snackBar: MatSnackBar
  ) { 
    
  }


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
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('User confirmed logout. Implement logout logic here.');
    });
  }

  search() {
    console.log('Search button and prpperty type : ', this.selectedPropertyType, ' and the price ranfe is ', this.selectedPriceRange, ' and the no of rooms is ', this.selectedNumRooms, ' and the query search is ', this.searchText, ' and the location is ', this.selectedLocation);
  }






}
