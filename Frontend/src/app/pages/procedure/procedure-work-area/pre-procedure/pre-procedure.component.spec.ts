import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProcedureComponent } from './pre-procedure.component';

describe('PreProcedureComponent', () => {
  let component: PreProcedureComponent;
  let fixture: ComponentFixture<PreProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreProcedureComponent]
    });
    fixture = TestBed.createComponent(PreProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
