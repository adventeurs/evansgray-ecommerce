import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInfoComponent } from './shipping-info.component';

describe('ShippingInfoComponent', () => {
  let component: ShippingInfoComponent;
  let fixture: ComponentFixture<ShippingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
