import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  //modalRef!: BsModalRef;
  bookingForm!: FormGroup
  // service!: IService;
  // company!: ICompany;
  // user!: IUser;
  // staffList: IStaff[] = [];


  constructor(private fb: FormBuilder, public router: Router) { }

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
    this.updateSlots(new Date(evt));

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
