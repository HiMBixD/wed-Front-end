import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSubmissionBrowserComponent } from './selected-submission-browser.component';

describe('SelectedSubmissionBrowserComponent', () => {
  let component: SelectedSubmissionBrowserComponent;
  let fixture: ComponentFixture<SelectedSubmissionBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSubmissionBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSubmissionBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
