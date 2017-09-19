import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestComponent } from './select-test.component';

describe('SelectTestComponent', () => {
  let component: SelectTestComponent;
  let fixture: ComponentFixture<SelectTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
