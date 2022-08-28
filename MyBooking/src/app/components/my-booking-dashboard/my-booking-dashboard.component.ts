import { Component, OnInit } from '@angular/core';
import { IBookingForm } from 'src/app/model/bookingFrom';

@Component({
  selector: 'app-my-booking-dashboard',
  templateUrl: './my-booking-dashboard.component.html',
  styleUrls: ['./my-booking-dashboard.component.scss']
})
export class MyBookingDashboardComponent implements OnInit {

  bookingForm!:IBookingForm;
  public cart: any = {
    selectedSeats: [],
    seatsToSave: [],
    totalPrice: 0,
    cartId: "",
    eventId: 0
  };
  constructor() { }
  
  ngOnInit(): void {
  }

}
