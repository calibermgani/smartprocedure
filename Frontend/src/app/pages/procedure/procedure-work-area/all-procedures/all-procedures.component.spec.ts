import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProceduresComponent } from './all-procedures.component';

describe('AllProceduresComponent', () => {
  let component: AllProceduresComponent;
  let fixture: ComponentFixture<AllProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProceduresComponent]
    });
    fixture = TestBed.createComponent(AllProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
