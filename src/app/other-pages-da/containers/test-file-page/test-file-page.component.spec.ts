import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFilePageComponent } from './test-file-page.component';

describe('TestFilePageComponent', () => {
  let component: TestFilePageComponent;
  let fixture: ComponentFixture<TestFilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
