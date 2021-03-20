import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourActivitiesComponent } from './your-activities.component';

describe('YourActivitiesComponent', () => {
  let component: YourActivitiesComponent;
  let fixture: ComponentFixture<YourActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
