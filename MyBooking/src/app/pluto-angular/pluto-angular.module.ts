import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { PLUTO_ID } from "./provider/client-id.provider";


@NgModule({
  imports: [HttpClientModule]
})

//<------------This module is Refered from this open source api  https://api.pluto.ricardosanchez.dev/api/payments/create-payment-intent------------->
export class PlutoModule {
  static forRoot(clientId?: string): ModuleWithProviders<PlutoModule> {
    return {
      ngModule: PlutoModule,
      providers: [
        {
          provide: PLUTO_ID,
          useValue: clientId
        }
      ]
    };
  }
}
