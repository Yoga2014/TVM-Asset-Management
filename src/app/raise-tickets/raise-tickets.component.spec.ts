import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseTicketsComponent } from './raise-tickets.component';

describe('RaiseTicketsComponent', () => {
  let component: RaiseTicketsComponent;
  let fixture: ComponentFixture<RaiseTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaiseTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaiseTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
