import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetregisterComponent } from './assetregister.component';

describe('AssetregisterComponent', () => {
  let component: AssetregisterComponent;
  let fixture: ComponentFixture<AssetregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
