
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [

  {
      path: '',
      loadChildren: () => import('./../../login-register/login-register.module').then(m => m.LoginRegisterModule),
      data: { preload: true, name: 'default' }
  },
  {
    path: 'view',
    component: MainLayoutComponent,
    children: [
      {
        path: 'booking',
        loadChildren: () => import('./../../booking/booking.module').then(m => m.BookingModule),
        data: { preload: true, name: 'default' } 
      }
  
]
},
{
  path: '**',
  redirectTo: 'user'
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }

