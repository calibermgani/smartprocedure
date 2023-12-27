import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraProcedureComponent } from './intra-procedure.component';

describe('IntraProcedureComponent', () => {
  let component: IntraProcedureComponent;
  let fixture: ComponentFixture<IntraProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntraProcedureComponent]
    });
    fixture = TestBed.createComponent(IntraProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
