import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProcedureComponent } from './post-procedure.component';

describe('PostProcedureComponent', () => {
  let component: PostProcedureComponent;
  let fixture: ComponentFixture<PostProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostProcedureComponent]
    });
    fixture = TestBed.createComponent(PostProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
