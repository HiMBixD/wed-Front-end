import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubmissionsComponent } from './all-submissions.component';

describe('AllSubmissionsComponent', () => {
  let component: AllSubmissionsComponent;
  let fixture: ComponentFixture<AllSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
