import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllitemsGridViewComponent } from './allitems-grid-view.component';

describe('AllitemsGridViewComponent', () => {
  let component: AllitemsGridViewComponent;
  let fixture: ComponentFixture<AllitemsGridViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllitemsGridViewComponent]
    });
    fixture = TestBed.createComponent(AllitemsGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
