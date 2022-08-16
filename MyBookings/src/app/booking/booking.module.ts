import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSeatComponent } from './view-seat/view-seat.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { BookingRoutingModule } from './booking-routing.module';



@NgModule({
  declarations: [
    ViewSeatComponent,
    PaymentGatewayComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
