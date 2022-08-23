import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import { StripeService, StripeCardComponent } from "ngx-stripe";

import { switchMap } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { PlutoService } from 'src/app/pluto-angular';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  stripeTest!: FormGroup;
  paying = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private plutoService: PlutoService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ["Angular v11", [Validators.required]],
      amount: [1005, [Validators.required, Validators.pattern(/\d+/)]]
    });
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.paying = true;
      this.plutoService
        .createPaymentIntent({
          amount: this.stripeTest.get("amount")?.value,
          currency: "eur"
        })
        .pipe(
          switchMap((pi:any) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest.get("name")?.value
                }
              }
            })
          )
        )
        .subscribe(result => {
          this.paying = false;
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            this.openDialog({ success: false, error: result.error.message });
          } else {
            // The payment has been processed!
            if (result.paymentIntent?.status === "succeeded") {
              // Show a success message to your customer
              this.openDialog({ success: true });
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }

  openDialog(data:any) {
    this.dialog.open(DialogComponent, { data });
  }
}
