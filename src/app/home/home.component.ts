import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    private http: HttpClient
  ){ }


  ngOnInit(): void {
    
    // this.items$ = [];
    // Fetch data from your API (replace 'apiUrl' with your backend endpoint)
    // this.items$ = this.http.get<any[]>('apiUrl').pipe(
    //   map(response => response.data) // Assuming your API response contains an array of data
    // );
  }
}