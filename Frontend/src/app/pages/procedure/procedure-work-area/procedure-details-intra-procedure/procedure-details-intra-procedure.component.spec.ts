import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsIntraProcedureComponent } from './procedure-details-intra-procedure.component';

describe('ProcedureDetailsIntraProcedureComponent', () => {
  let component: ProcedureDetailsIntraProcedureComponent;
  let fixture: ComponentFixture<ProcedureDetailsIntraProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcedureDetailsIntraProcedureComponent]
    });
    fixture = TestBed.createComponent(ProcedureDetailsIntraProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
