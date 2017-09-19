import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDepComponent } from './modify-dep.component';

describe('ModifyDepComponent', () => {
  let component: ModifyDepComponent;
  let fixture: ComponentFixture<ModifyDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
