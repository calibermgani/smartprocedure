import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAreaComponent } from './work-area.component';

describe('WorkAreaComponent', () => {
  let component: WorkAreaComponent;
  let fixture: ComponentFixture<WorkAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkAreaComponent]
    });
    fixture = TestBed.createComponent(WorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
