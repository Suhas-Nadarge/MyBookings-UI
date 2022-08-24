import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StripeService, StripeCardComponent } from "ngx-stripe";
import { switchMap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/dialog/dialog.component';
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

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private plutoService: PlutoPaymentService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      name: ["Test Demo", [Validators.required]],
      amount: [1005, [Validators.required, Validators.pattern(/\d+/)]]
    });
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
          switchMap((pi:any) =>
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
        .subscribe((result:any) => {
          this.paying = false;
          if (result.error) {
            this.openDialog({ success: false, error: result.error.message });
          } else {
            if (result.paymentIntent?.status === "succeeded") {
              this.openDialog({ success: true });
            }
          }
        });
    } else {
      console.log(this.paymentForm);
    }
  }

  openDialog(data:any) {
    this.dialog.open(DialogComponent, { data });
  }
}
