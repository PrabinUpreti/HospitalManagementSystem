import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTestComponent } from './selected-test.component';

describe('SelectedTestComponent', () => {
  let component: SelectedTestComponent;
  let fixture: ComponentFixture<SelectedTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
