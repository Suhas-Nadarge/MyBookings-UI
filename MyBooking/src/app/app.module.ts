import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ViewSeatsComponent } from './components/view-seats/view-seats.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { SocketService } from './services/socket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from "@angular/flex-layout";

import { NgxStripeModule } from "ngx-stripe";

import { MaterialModule } from "./material.module";
import { PlutoModule } from './pluto-angular/pluto-angular.module';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ViewSeatsComponent,
    PaymentGatewayComponent,
    DialogComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
		SocketIoModule.forRoot(config), 
    MaterialModule,
    FlexLayoutModule,PlutoModule,
    NgxStripeModule.forRoot(
      "pk_test_51Ii5RpH2XTJohkGafOSn3aoFFDjfCE4G9jmW48Byd8OS0u2707YHusT5PojHOwWAys9HbvNylw7qDk0KkMZomdG600TJYNYj20"
    ),
    PlutoModule.forRoot("449f8516-791a-49ab-a09d-50f79a0678b6")
  ],
  providers: [SocketService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }



