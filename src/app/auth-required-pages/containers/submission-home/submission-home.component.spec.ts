import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionHomeComponent } from './submission-home.component';

describe('SubmissionHomeComponent', () => {
  let component: SubmissionHomeComponent;
  let fixture: ComponentFixture<SubmissionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
