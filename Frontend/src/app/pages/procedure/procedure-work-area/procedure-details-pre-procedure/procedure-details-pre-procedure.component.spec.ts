import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsPreProcedureComponent } from './procedure-details-pre-procedure.component';

describe('ProcedureDetailsPreProcedureComponent', () => {
  let component: ProcedureDetailsPreProcedureComponent;
  let fixture: ComponentFixture<ProcedureDetailsPreProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureDetailsPreProcedureComponent]
    });
    fixture = TestBed.createComponent(ProcedureDetailsPreProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
