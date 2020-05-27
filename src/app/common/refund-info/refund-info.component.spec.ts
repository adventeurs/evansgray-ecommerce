import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundInfoComponent } from './refund-info.component';

describe('RefundInfoComponent', () => {
  let component: RefundInfoComponent;
  let fixture: ComponentFixture<RefundInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
