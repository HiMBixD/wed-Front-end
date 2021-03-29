import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureManagementComponent } from './closure-management.component';

describe('ClosureManagementComponent', () => {
  let component: ClosureManagementComponent;
  let fixture: ComponentFixture<ClosureManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosureManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
