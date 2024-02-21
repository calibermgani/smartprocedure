import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsPostProcedureComponent } from './procedure-details-post-procedure.component';

describe('ProcedureDetailsPostProcedureComponent', () => {
  let component: ProcedureDetailsPostProcedureComponent;
  let fixture: ComponentFixture<ProcedureDetailsPostProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureDetailsPostProcedureComponent]
    });
    fixture = TestBed.createComponent(ProcedureDetailsPostProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
