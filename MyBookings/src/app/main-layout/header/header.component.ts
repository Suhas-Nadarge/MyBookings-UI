import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(public router: Router) {
  }
    // public toast: ToastrManager
    
  
 ngOnInit(): void {
 
 }

 logout(): any{
   localStorage.clear();
  //  this.toast.successToastr('User logged out successfully', 'Success')
  //  this.router.navigate([''])
 }

 navigateHome(){
//    if(localStorage.getItem('isDoctor') === 'true'){
//      this.router.navigate(['/book/appointments/view-appointments'])
//    } else {
//      this.router.navigate(['/pages/appointments/search'])
//    }
//  }

}
}
