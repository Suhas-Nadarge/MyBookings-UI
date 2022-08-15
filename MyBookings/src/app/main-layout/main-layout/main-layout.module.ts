import { MainLayoutComponent } from './main-layout.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutRoutingModule } from './main-layout-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
  ] 
})
export class MainLayoutModule { }
