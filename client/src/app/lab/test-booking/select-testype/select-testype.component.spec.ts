import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestypeComponent } from './select-testype.component';

describe('SelectTestypeComponent', () => {
  let component: SelectTestypeComponent;
  let fixture: ComponentFixture<SelectTestypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTestypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTestypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
