import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemsTableViewComponent } from './allitems-table-view.component';

describe('AllGridTableViewComponent', () => {
  let component: AllItemsTableViewComponent;
  let fixture: ComponentFixture<AllItemsTableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllItemsTableViewComponent]
    });
    fixture = TestBed.createComponent(AllItemsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
