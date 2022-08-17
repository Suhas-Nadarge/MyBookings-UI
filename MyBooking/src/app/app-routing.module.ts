
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ViewSeatsComponent } from './components/view-seats/view-seats.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';





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
    path: 'payment-gateway',
    component: PaymentGatewayComponent
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