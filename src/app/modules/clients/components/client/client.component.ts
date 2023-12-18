import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'app/modules/core/models/client.model';
import { ClientsService } from 'app/modules/core/services/clients.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  client!: Client;
  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientsService.getClient(+params['id'])))
      .subscribe({
        next: (client) => {
          this.client = client;
        },
      });
  }
}
