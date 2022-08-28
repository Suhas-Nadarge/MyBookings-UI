import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movies } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { CalenderViewComponent } from '../calender-view/calender-view.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @ViewChild('myModalClose') modalClose!: ElementRef;
  @ViewChild('exampleModal') modal!:ElementRef;
  @ViewChild(CalenderViewComponent) child!:CalenderViewComponent;
  movieDetails: Movies = {};
  backgroundGrad: any;

  constructor(
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.movieDetails = this.userService.getMovie() || {};
    this.backgroundGrad = 'background: linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/liger-et00304947-1661172816.jpg); ';
    
    if (!Object.keys(this.movieDetails).length) {
      this.router.navigate(['/home']);
    }
  }

  bookTicket(): void {
    this.router.navigate(['/view-seats']);
  }

  closeModal(evt:any) {
    this.child.bookAppointment();
  }

  getData(evt:any){
    //console.log(evt);
    this.modalClose.nativeElement.click()
    const obj: any = {evt}
    obj['name']=  localStorage.getItem('name');
    obj['moviename']= this.movieDetails.movieName
    obj['show_date'] = evt['show_date']
    obj['slot'] = evt['slot']

    this.router.navigate(['/view-seats/', { 'bookingData': JSON.stringify(obj) }])
  }

}
