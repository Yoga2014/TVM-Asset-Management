import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-assetregister',
  standalone: true,
  imports: [
     FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule
  ],
  templateUrl: './assetregister.component.html',
  styleUrl: './assetregister.component.scss'
})
export class AssetregisterComponent {
categories: string[] = [
    'Laptop',
    'Mobile',
    'Charger',
    'SIM Card'
  ];

  assetForm: FormGroup;

  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  imageError = false;
  MAX_IMAGES = 2;

  constructor(private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      assetName: ['', Validators.required],
      assetId: ['', Validators.required],
      category: ['', Validators.required],
      condition: [{ value: '', disabled: true }],
      assignedDate: ['', Validators.required],
      employeeId: ['', Validators.required],
      employeeName: [{ value: '', disabled: true }]
    });
  }

  onCategoryChange(category: string): void {
    this.imagePreviews = [];
    this.selectedFiles = [];
    this.imageError = false;

    let condition = '';

    switch (category) {
      case 'Laptop':
        condition = 'Returnable, Damage check required';
        this.MAX_IMAGES = 2;
        break;

      case 'Mobile':
        condition = 'Returnable, IMEI verification required';
        this.MAX_IMAGES = 2;
        break;

      case 'Charger':
        condition = 'Returnable';
        this.MAX_IMAGES = 2;
        break;

      case 'SIM Card':
        condition = 'Non-returnable';
        this.MAX_IMAGES = 1;
        break;
    }

    this.assetForm.get('condition')?.setValue(condition);
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);

    if (files.length > this.MAX_IMAGES) {
      this.imageError = true;
      input.value = '';
      return;
    }

    this.imageError = false;
    this.imagePreviews = [];
    this.selectedFiles = [];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;

      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  submit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    const category = this.assetForm.get('category')?.value;

    if (
      (category === 'Laptop' || category === 'Mobile') &&
      this.selectedFiles.length === 0
    ) {
      alert('Images are required for Laptop and Mobile assets');
      return;
    }

    const formData = new FormData();
    const formValue = this.assetForm.getRawValue();

    Object.keys(formValue).forEach(key => {
      formData.append(key, formValue[key]);
    });

    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    console.log('Assigned Asset Data:', formValue);
  }
}
