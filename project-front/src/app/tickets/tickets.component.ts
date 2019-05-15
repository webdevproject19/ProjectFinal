import { Component, OnInit } from '@angular/core';
import { ITicket } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public tickets: ITicket[] = [];
  public empty = true;

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.provider.getTickets().then(res => {
      this.tickets = res;
      if (res.length !== 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    });
  }

  putTicket(ticket: ITicket) {
    this.provider.putTicket(ticket).then(res => {

    });
  }

  deleteTicket(ticket: ITicket) {
    this.provider.deleteTicket(ticket).then(res => {
      this.getTickets();
    });
  }

  deleteTickets() {
    this.provider.deleteTickets().then(res => {
      window.location.reload();
    });
  }

}
