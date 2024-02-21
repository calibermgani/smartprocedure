import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsBookingComponent } from './procedure-details-booking.component';

describe('ProcedureDetailsBookingComponent', () => {
  let component: ProcedureDetailsBookingComponent;
  let fixture: ComponentFixture<ProcedureDetailsBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureDetailsBookingComponent]
    });
    fixture = TestBed.createComponent(ProcedureDetailsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
