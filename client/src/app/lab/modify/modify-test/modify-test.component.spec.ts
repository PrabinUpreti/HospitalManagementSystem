import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTestComponent } from './modify-test.component';

describe('ModifyTestComponent', () => {
  let component: ModifyTestComponent;
  let fixture: ComponentFixture<ModifyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
