
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ViewSeatsComponent } from './components/view-seats/view-seats.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { DetailsComponent } from './components/details/details.component';
import { MyBookingDashboardComponent } from './components/my-booking-dashboard/my-booking-dashboard.component';
import { AuthGuard } from './services/auth.guard';





const routes: Routes = [
  {
    path: '',
    component: SignupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,canActivate: [AuthGuard]
  },
  {
    path: 'view-seats',
    component: ViewSeatsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'details',
    component: DetailsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'payment-gateway',
    component: PaymentGatewayComponent,canActivate: [AuthGuard]
  },
  {
    path: 'booking-dashboard',
    component: MyBookingDashboardComponent,canActivate: [AuthGuard]
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