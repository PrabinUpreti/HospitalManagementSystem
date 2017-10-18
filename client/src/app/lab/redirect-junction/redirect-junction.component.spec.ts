import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectJunctionComponent } from './redirect-junction.component';

describe('RedirectJunctionComponent', () => {
  let component: RedirectJunctionComponent;
  let fixture: ComponentFixture<RedirectJunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectJunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectJunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
