import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAcountsComponent } from './customer-acounts.component';

describe('CustomerAcountsComponent', () => {
  let component: CustomerAcountsComponent;
  let fixture: ComponentFixture<CustomerAcountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAcountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAcountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
