import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbuttonComponent } from './checkbutton.component';

describe('CheckbuttonComponent', () => {
  let component: CheckbuttonComponent;
  let fixture: ComponentFixture<CheckbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
