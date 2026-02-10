import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-raise-tickets',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './raise-tickets.component.html',
  styleUrl: './raise-tickets.component.scss'
})
export class RaiseTicketsComponent {

  imageFiles: File[] = [];
  imagePreviews: string[] = [];

  ticketForm = this.fb.group({
    employeeName: ['Sindhuja'],
    assetId: ['MBL-101'],
    category: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.ticketForm.valid) {
      console.log('Form Data:', this.ticketForm.value);
      console.log('Uploaded Images:', this.imageFiles);
      alert('Ticket Raised Successfully!');
    }
  }

  onFileSelect(event: any) {
    const files: FileList = event.target.files;

    this.imageFiles = [];
    this.imagePreviews = [];

    Array.from(files).forEach(file => {
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
