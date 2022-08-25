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
import { PlutoPaymentModule } from './pluto-angular/pluto-payment.module';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxIdleTimeoutModule } from 'ngx-idle-timeout';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  IgxCalendarModule,
  IgxDialogModule
} from "igniteui-angular";
import { ValidatorService } from './services/validators.service';
import { UserService } from './services/user.service';

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
    DialogComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,NgxSpinnerModule,
    TooltipModule.forRoot(),ToastrModule.forRoot(),
		SocketIoModule.forRoot(config), 
    MaterialModule,IgxCalendarModule,
    IgxDialogModule,
    NgxIdleTimeoutModule,
    FlexLayoutModule,PlutoPaymentModule,
    NgxStripeModule.forRoot(
      "pk_test_51Ii5RpH2XTJohkGafOSn3aoFFDjfCE4G9jmW48Byd8OS0u2707YHusT5PojHOwWAys9HbvNylw7qDk0KkMZomdG600TJYNYj20"
    ),
    PlutoPaymentModule.forRoot("449f8516-791a-49ab-a09d-50f79a0678b6")
  ],
  providers: [SocketService,ValidatorService,UserService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }



