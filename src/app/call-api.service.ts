import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';
import { response } from 'express';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(
    private popUpService : PopupService
  ) { }

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
