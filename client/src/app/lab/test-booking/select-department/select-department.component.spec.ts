import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartmentComponent } from './select-department.component';

describe('SelectDepartmentComponent', () => {
  let component: SelectDepartmentComponent;
  let fixture: ComponentFixture<SelectDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
