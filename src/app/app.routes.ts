import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PayComponent } from './home/pay/pay.component';
import { MapComponent } from './home/map/map.component';

export const routes: Routes = [
    {path : '', component : LoginComponent},
    {path : 'home', component : HomeComponent},
    {path : 'pay', component : PayComponent},
    {path : 'map', component : MapComponent},
    {path : '**', component : PageNotFoundComponent},
];
