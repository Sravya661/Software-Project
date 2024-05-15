import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopupService } from '../popup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dir } from 'console';
import { RouterLink } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { Property, Type ,Range,Room,location} from '../interfaces';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CarouselModule,
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {


    //   propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Duplex', 'Penthouse', 'Cottage', 'Bungalow', 'Farmhouse'];
    propertyTypes!: Type[];
    priceRanges!: Range[];
    locations!: location[];
    // locations = ['City Center', 'Suburbs', 'Beachfront', 'Mountain View', 'Lakefront', 'Rural', 'Gated Community', 'Downtown'];
    // noOfRooms = ['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms'];
    // priceRanges = ['Under $100,000', '$100,000 - $200,000', '$200,000 - $300,000', '$300,000 - $400,000', '$400,000 - $500,000', 'Over $500,000'];
    noOfRooms!: Room[];
    selectedPropertyType: string = '';
    selectedLocation: string = '';
    selectedNumRooms: string = '';
    selectedPriceRange: string = '';
    searchText: string = '';
    userEmail = '';
    properties!: Property[];

    constructor(
        private popUpService: PopupService,
        private snackBar: MatSnackBar,
        private callApiService: CallApiService
    ) {

    }


    ngOnInit(): void {
        this.userEmail = 'choudhary98akash@gmal.com';


        this.callApiService.fetchProperties().then(properties => {
            this.properties = properties;
        }).catch(error => {
            console.error('Error fetching properties:', error);
            this.popUpService.toast('Data not available! Please try Again Later');
        });


        this.callApiService.fetchType().then(data => {
            this.propertyTypes = data;
        }).catch(error => {
            console.error('Error fetching properties:', error);
            this.popUpService.toast('Property Type data not available! Please try Again Later');
        });

        this.callApiService.fetchRange().then(data => {
            this.priceRanges = data;
        }).catch(error => {
            console.error('Error fetching properties:', error);
            this.popUpService.toast('Range data not available! Please try Again Later');
        });


        this.callApiService.fetchRooms().then(data => {
            this.noOfRooms = data;
        }).catch(error => {
            console.error('Error fetching properties:', error);
            this.popUpService.toast('Room data not available! Please try Again Later');
        });


        this.callApiService.fetchLocation().then(data => {
            this.locations = data;
        }).catch(error => {
            console.error('Error fetching properties:', error);
            this.popUpService.toast('Location data not available! Please try Again Later');
        });










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


    openImageInNewTab(imageUrl: string): void {
        if (imageUrl) {
            window.open(imageUrl, '_blank');
        }
    }
}
