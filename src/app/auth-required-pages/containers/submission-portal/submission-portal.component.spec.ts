import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionPortalComponent } from './submission-portal.component';

describe('SubmissionPortalComponent', () => {
  let component: SubmissionPortalComponent;
  let fixture: ComponentFixture<SubmissionPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
