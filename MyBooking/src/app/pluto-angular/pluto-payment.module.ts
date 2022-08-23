import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { PLUTP_TOKEN_ID } from "./provider/client-token.provider";


@NgModule({
  imports: [HttpClientModule]
})

//<------------This module is Refered from this open source api  https://api.pluto.ricardosanchez.dev/api/payments/create-payment-intent------------->
export class PlutoPaymentModule {
  static forRoot(clientId?: string): ModuleWithProviders<PlutoPaymentModule> {
    return {
      ngModule: PlutoPaymentModule,
      providers: [
        {
          provide: PLUTP_TOKEN_ID,
          useValue: clientId
        }
      ]
    };
  }
}
