import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PaymentIntent } from "@stripe/stripe-js";
import Stripe from "stripe";
import { PLUTP_TOKEN_ID } from "../provider/client-token.provider";


@Injectable({ providedIn: "root" })
export class PlutoPaymentService {
  private static readonly BASE_URL = "https://api.pluto.ricardosanchez.dev/api";

  constructor(
    @Inject(PLUTP_TOKEN_ID) private readonly clientId: string,
    private readonly http: HttpClient
  ) {}

  createPaymentIntent(
    params: Stripe.PaymentIntentCreateParams
  ): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${PlutoPaymentService.BASE_URL}/payments/create-payment-intent`,
      params,
      { headers: { merchant: this.clientId } }
    );
  }
}
