import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaiseTicketsComponent } from './raise-tickets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RaiseTicketsComponent', () => {
  let component: RaiseTicketsComponent;
  let fixture: ComponentFixture<RaiseTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RaiseTicketsComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RaiseTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Default form values
  it('should initialize form with default values', () => {
    expect(component.ticketForm.value.employeeName).toBe('Sindhuja');
    expect(component.ticketForm.value.assetId).toBe('MBL-101');
  });

  // ✅ Form invalid when required fields empty
  it('should make form invalid when required fields are empty', () => {
    component.ticketForm.patchValue({
      category: '',
      description: ''
    });

    expect(component.ticketForm.valid).toBeFalse();
  });

  // ✅ Form valid when required fields filled
  it('should make form valid when required fields are filled', () => {
    component.ticketForm.patchValue({
      category: 'Hardware',
      description: 'Screen issue'
    });

    expect(component.ticketForm.valid).toBeTrue();
  });

  // ✅ submit() should NOT run when form invalid
  it('should not alert when form is invalid', () => {
    spyOn(window, 'alert');
    component.ticketForm.patchValue({
      category: '',
      description: ''
    });

    component.submit();

    expect(window.alert).not.toHaveBeenCalled();
  });

  // ✅ submit() should run when form valid
  it('should alert when form is valid', () => {
    spyOn(window, 'alert');
    component.ticketForm.patchValue({
      category: 'Hardware',
      description: 'Battery issue'
    });

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Ticket Raised Successfully!');
  });

  // ✅ onFileSelect should update imageFiles
  it('should update imageFiles and imagePreviews on file select', () => {
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

    const event = {
      target: {
        files: [mockFile]
      }
    };

    component.onFileSelect(event);

    expect(component.imageFiles.length).toBe(1);
  });

});
