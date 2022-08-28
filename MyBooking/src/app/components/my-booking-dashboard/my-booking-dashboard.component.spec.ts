import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingDashboardComponent } from './my-booking-dashboard.component';

describe('MyBookingDashboardComponent', () => {
  let component: MyBookingDashboardComponent;
  let fixture: ComponentFixture<MyBookingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBookingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
