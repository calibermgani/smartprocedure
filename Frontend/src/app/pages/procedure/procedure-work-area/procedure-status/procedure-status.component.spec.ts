import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureStatusComponent } from './procedure-status.component';

describe('ProcedureStatusComponent', () => {
  let component: ProcedureStatusComponent;
  let fixture: ComponentFixture<ProcedureStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureStatusComponent]
    });
    fixture = TestBed.createComponent(ProcedureStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
