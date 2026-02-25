import { Component } from '@angular/core';
import { Ticket } from './ticket.model';
import { TicketService } from './ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigned-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned-tickets.component.html',
  styleUrl: './assigned-tickets.component.scss'
})
export class AssignedTicketsComponent {
tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {
    this.ticketService.tickets$.subscribe(data => {
      this.tickets = data;
    });
  }

  closeTicket(id: number) {
    this.ticketService.closeTicket(id);
  }

  get openTickets() {
    return this.tickets.filter(t => t.status === 'Open');
  }

  get closedTickets() {
    return this.tickets.filter(t => t.status === 'Closed');
  }

}
