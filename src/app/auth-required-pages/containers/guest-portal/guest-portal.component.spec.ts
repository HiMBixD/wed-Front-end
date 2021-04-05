import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPortalComponent } from './guest-portal.component';

describe('GuestPortalComponent', () => {
  let component: GuestPortalComponent;
  let fixture: ComponentFixture<GuestPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
