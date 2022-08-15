
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

// const routes: Routes = [

//   {
    
//       path: '',
//       loadChildren: () => import('./../../users/users.module').then(m => m.UsersModule),
//       data: { preload: true, name: 'default' }
//   },
//   {
//     path: 'pages',
//     component: MainLayoutComponent,
//     children: [
//       {
//         path: 'appointments',
//         loadChildren: () => import('./../../appointments/appointments.module').then(m => m.AppointmentsModule),
//         data: { preload: true, name: 'default' } 
//       },
  
// ]
// },
// {
//   path: '**',
//   redirectTo: 'user'
// }
// ]

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }

