
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ViewSeatsComponent } from './components/view-seats/view-seats.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { DetailsComponent } from './components/details/details.component';
import { MyBookingDashboardComponent } from './components/my-booking-dashboard/my-booking-dashboard.component';





const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'view-seats',
    component: ViewSeatsComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'payment-gateway',
    component: PaymentGatewayComponent
  },
  {
    path: 'booking-dashboard',
    component: MyBookingDashboardComponent
  },
  {
    path: '**',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}