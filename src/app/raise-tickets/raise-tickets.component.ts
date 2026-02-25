import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../assigned-tickets/ticket.service';
import { Ticket } from '../assigned-tickets/ticket.model';


@Component({
  selector: 'app-raise-tickets',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './raise-tickets.component.html',
  styleUrl: './raise-tickets.component.scss'
})
export class RaiseTicketsComponent {

  ticketForm = this.fb.group({
    employeeName: ['Sindhuja'],
    assetId: ['MBL-101'],
    category: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private ticketService: TicketService) {}

  submit() {
    if (this.ticketForm.valid) {

      const newTicket: Ticket = {
        id: Date.now(),
        employeeName: this.ticketForm.value.employeeName!,
        assetId: this.ticketForm.value.assetId!,
        category: this.ticketForm.value.category!,
        description: this.ticketForm.value.description!,
        status: 'Open'
      };

      this.ticketService.addTicket(newTicket);

      alert('Ticket Raised Successfully!');
      this.ticketForm.reset();
    }
  }
}
