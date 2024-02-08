import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyConsumedComponent } from './daily-consumed.component';

describe('DailyConsumedComponent', () => {
  let component: DailyConsumedComponent;
  let fixture: ComponentFixture<DailyConsumedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyConsumedComponent]
    });
    fixture = TestBed.createComponent(DailyConsumedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
