import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllitemsListViewComponent } from './allitems-list-view.component';

describe('AllitemsListViewComponent', () => {
  let component: AllitemsListViewComponent;
  let fixture: ComponentFixture<AllitemsListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllitemsListViewComponent]
    });
    fixture = TestBed.createComponent(AllitemsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
