import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { ViewSeatComponent } from './view-seat/view-seat.component';





const routes: Routes = [{
  path: 'view-seat',
  component: ViewSeatComponent, canActivate: [AuthGuard]
},
{
  path: 'payment-gateway',
  component: ViewSeatComponent, canActivate: [AuthGuard]
},
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {

}