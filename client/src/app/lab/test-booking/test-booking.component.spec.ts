import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBookingComponent } from './test-booking.component';

describe('TestBookingComponent', () => {
  let component: TestBookingComponent;
  let fixture: ComponentFixture<TestBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
