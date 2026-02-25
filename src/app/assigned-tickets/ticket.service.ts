import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [];

  private ticketSubject = new BehaviorSubject<Ticket[]>([]);
  tickets$ = this.ticketSubject.asObservable();

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
    this.ticketSubject.next(this.tickets);
  }

  closeTicket(id: number) {
    const ticket = this.tickets.find(t => t.id === id);
    if (ticket) {
      ticket.status = 'Closed';
      this.ticketSubject.next(this.tickets);
    }
  }
}
