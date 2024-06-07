import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalHistoryTabComponent } from './clinical-history-tab.component';

describe('ClinicalHistoryTabComponent', () => {
  let component: ClinicalHistoryTabComponent;
  let fixture: ComponentFixture<ClinicalHistoryTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicalHistoryTabComponent]
    });
    fixture = TestBed.createComponent(ClinicalHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
