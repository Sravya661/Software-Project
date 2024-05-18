import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopupService } from '../popup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dir } from 'console';
import { Route, Router, RouterLink } from '@angular/router';
import { CallApiService } from '../call-api.service';
import { Property, Type, Range, Room, location } from '../interfaces';


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

    propertyTypes!: Type[];
    priceRanges!: Range[];
    locations!: location[];
    noOfRooms!: Room[];
    properties!: Property[];
    selectedPropertyType ='';
    selectedLocation = '';
    selectedNumRooms = '';
    selectedPriceRange = '';
    // range!this.selectedPriceRange.range;
    searchText = '';
    userEmail = '';
    loggedIn! : any;
    

    constructor(
        private popUpService: PopupService,
        private snackBar: MatSnackBar,
        private callApiService: CallApiService,
        private route : Router
    ) {

    }


    ngOnInit(): void {

        //improper login sanitization
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
        




        this.callApiService.fetchProperties().then(data => {
            this.properties = data;
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
            console.error('Error fetching roomdata:', error);
            this.popUpService.toast('Room data not available! Please try Again Later');
        });


        this.callApiService.fetchLocation().then(data => {
            this.locations = data;
        }).catch(error => {
            console.error('Error fetching location:', error);
            this.popUpService.toast('Location data not available! Please try Again Later');
        });

    }

    logout() {
        const snackBarRef = this.snackBar.open('Are you sure you want to logout?', 'Yes', {
            duration: 5000
        });
        snackBarRef.onAction().subscribe(() => {
            // console.log('User confirmed logout. Implement logout logic here.');
            this.popUpService.toast('Logged out successfully');
            localStorage.setItem('session', 'false');
            this.route.navigate(['/'])
        });
    
        
    }

    search() {
        
        console.log('Property: ', this.selectedPropertyType, ' Range :  ', this.selectedPriceRange, ' and the no of rooms is ', this.selectedNumRooms, ' and the query search is ', this.searchText, ' and the location is ', this.selectedLocation,' from component');
        this.callApiService.search(this.selectedPropertyType,this.selectedLocation,this.selectedNumRooms,this.selectedPriceRange,this.searchText )
        .then(data => {
            this.properties = data;
        }).catch(error => {
            // console.error('Error fetching properties:', error);
            this.popUpService.toast('No data Found');
        });
        this.resetSelected();

    }


    openImageInNewTab(imageUrl: string): void {
        if (imageUrl) {
            window.open(imageUrl, '_blank');
        }
    }
    resetSelected(){
        this.selectedLocation = '';
        this.selectedNumRooms = '';
        this.selectedPriceRange = '';
        this.selectedPropertyType = '';
    }
}
