import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullGridComponent } from './view-full-grid.component';

describe('ViewFullGridComponent', () => {
  let component: ViewFullGridComponent;
  let fixture: ComponentFixture<ViewFullGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFullGridComponent]
    });
    fixture = TestBed.createComponent(ViewFullGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
