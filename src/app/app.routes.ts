import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path : '', component : LoginComponent},
    {path : 'home', component : HomeComponent},
    {path : 'payment', component : PaymentComponent},
    {path : '**', component : PageNotFoundComponent},
];
