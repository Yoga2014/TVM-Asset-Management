import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AssetregisterComponent } from './assetregister.component';

describe('AssetregisterComponent', () => {
  let component: AssetregisterComponent;
  let fixture: ComponentFixture<AssetregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetregisterComponent],
      imports: [NoopAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();   // ✅ Important
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
