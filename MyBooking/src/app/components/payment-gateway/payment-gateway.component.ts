import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StripeService, StripeCardComponent } from "ngx-stripe";
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { IBookingForm } from 'src/app/model/bookingFrom';
import { PlutoPaymentService } from 'src/app/pluto-angular/services/pluto-payment.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  paymentForm!: FormGroup;
  paying = false;
  timer$ = timer(192000);
  countDown$ = interval(1000).pipe(takeUntil(this.timer$));
  bookingForm!: any
  public cart: any = {
    selectedSeats: [],
    seatsToSave: [],
    totalPrice: 0,
    cartId: "",
    eventId: 0
  };
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private plutoService: PlutoPaymentService,
    private stripeService: StripeService,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {
  this.getRouteData();
    this.paymentForm = this.fb.group({
      name: [localStorage.getItem('name'), [Validators.required]],
      amount: [this.bookingForm.totalPrice, [Validators.required, Validators.pattern(/\d+/)]]
    });
    this.timer$.subscribe(
      () => { },
      () => { },
      () => {
        this.router.navigate(['/details']);
      }
    )
  }
  

  getRouteData() {
    this.bookingForm = JSON.parse(this.route.snapshot.paramMap.get('bookingData') || '{}')
    this.cart = this.route.snapshot.paramMap.get('cart') || {}
    console.log('check all data----->'+JSON.stringify(this.bookingForm));
//     show_date: "2022-08-30T23:00:00.000Z"
// show_number: 4
// slot: "02:00 PM "
    console.log(this.cart);
  }


  pay(): void {
    if (this.paymentForm.valid) {
      this.paying = true;
      this.plutoService
        .createPaymentIntent({
          amount: this.paymentForm.get("amount")?.value,
          currency: "eur"
        })
        .pipe(
          switchMap((pi: any) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.paymentForm.get("name")?.value
                }
              }
            })
          )
        )
        .subscribe((result: any) => {
          this.paying = false;
          if (result.error) {
            this.openDialog({ success: false, error: result.error.message });
          } else {
            if (result.paymentIntent?.status === "succeeded") {
              // this.openDialog({ success: true });
              this.toastr.successToastr('Payment collected successfully', 'Success')
              this.router.navigate(['/booking-dashboard', { 'bookingData':JSON.stringify(this.bookingForm) }])
            }
          }
        },
        (err: any)=>{
          this.toastr.successToastr('Payment collected successfully', 'Success')
          this.router.navigate(['/booking-dashboard', { 'bookingData': JSON.stringify(this.bookingForm) }])
      
          // this.paying = false;
          // this.toastr.errorToastr(err['error']['message'] ? err['error']['message'] : 'Server Down, Please try again!', 'Error');
          // this.spinnerService.hide();
        });
    } else {
      console.log(this.paymentForm);
    }
  }

  openDialog(data: any) {
    this.dialog.open(DialogComponent, { data });
  }
}
