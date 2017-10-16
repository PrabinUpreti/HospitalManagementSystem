import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbookingTransactionComponent } from './testbooking-transaction.component';

describe('TestbookingTransactionComponent', () => {
  let component: TestbookingTransactionComponent;
  let fixture: ComponentFixture<TestbookingTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestbookingTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestbookingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
