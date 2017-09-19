import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTestTypeComponent } from './modify-test-type.component';

describe('ModifyTestTypeComponent', () => {
  let component: ModifyTestTypeComponent;
  let fixture: ComponentFixture<ModifyTestTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyTestTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
