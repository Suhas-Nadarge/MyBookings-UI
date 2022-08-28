import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookingForm } from 'src/app/model/bookingFrom';

@Component({
  selector: 'app-my-booking-dashboard',
  templateUrl: './my-booking-dashboard.component.html',
  styleUrls: ['./my-booking-dashboard.component.scss']
})
export class MyBookingDashboardComponent implements OnInit {
  bookingList: any = []
  bookingForm!:IBookingForm;
  public cart: any = {
    selectedSeats: [],
    seatsToSave: [],
    totalPrice: 0,
    cartId: "",
    eventId: 0
  };
  constructor(public router: Router, public route:ActivatedRoute) { }
  
  ngOnInit(): void {
  this.getRouteData()
  }

  
  getRouteData() {
    this.bookingList.push(JSON.parse(this.route.snapshot.paramMap.get('bookingData') || '{}'))
    this.cart = this.route.snapshot.paramMap.get('cart') || '{}'
    console.log(this.bookingList);
//     show_date: "2022-08-30T23:00:00.000Z"
// show_number: 4
// slot: "02:00 PM "
    console.log(this.cart);
  }


}
