import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsEvaluationComponent } from './submissions-evaluation.component';

describe('SubmissionsEvaluationComponent', () => {
  let component: SubmissionsEvaluationComponent;
  let fixture: ComponentFixture<SubmissionsEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionsEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
