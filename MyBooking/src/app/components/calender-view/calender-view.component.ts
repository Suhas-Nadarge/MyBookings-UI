import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { timeSlot } from 'src/constant';

@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.css']
})
export class CalenderViewComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<FormGroup>();
  isPaid: boolean = false;
  bookedSlot: any;
  timeSlot = timeSlot
  bookingForm!: FormGroup
  


  constructor(private fb: FormBuilder, public toastr: ToastrManager, public router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.bookingForm = this.fb.group({
      show_number: ['', Validators.required],
      show_date: ['', Validators.required],
      slot: '',
    });
  }

  changeDate(evt: any) {
    this.refreshSlots();
    this.bookingForm.get('show_number')?.setValue('');
    this.bookingForm.get('slot')?.setValue('');
    this.bookingForm.get('show_date')?.setValue(new Date(evt));
    console.log('compare dates-'+new Date(),new Date(this.bookingForm.get('show_date')?.value))
    if(new Date() > new Date(this.bookingForm.get('show_date')?.value)){
      this.bookingForm.get('show_date')?.setValue('');
      this.toastr.warningToastr('Please select the future date', 'Warning')
    } else {
      if(this.bookingForm.get('show_date')?.value === ''){
        this.toastr.warningToastr(
          'Please select the Date!',
          'Note'
        );
      } else if(this.bookingForm.get('show_number')?.value === ''){
        this.toastr.warningToastr(
          'Please select the show time for Movie!',
          'Note'
        );
      } else {
        console.log(this.bookingForm.get('show_date')?.setValue(new Date(evt)))

      }
    this.updateSlots(new Date(evt));

  }
  }
  updateSlots(evt: any) {

  }

  refreshSlots() {
    this.timeSlot.filter(data => {
      data.slot_A.isAvailable = true;
      data.slot_B.isAvailable = true;
      data.slot_C.isAvailable = true;
    });
  }

  selectSlot(id: any, slot: any) {
    this.bookingForm.get('show_number')?.setValue(id);
    this.bookingForm.get('slot')?.setValue(slot);
  }


  bookAppointment() {
    this.newItemEvent.emit(this.bookingForm.value);
    //this.router.navigate(['/view-seats', { 'bookingData': JSON.stringify() }])
  }
}
