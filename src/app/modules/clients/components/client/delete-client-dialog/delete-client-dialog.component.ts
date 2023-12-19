import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'app/modules/core/models/client.model';
import { ClientsService } from 'app/modules/core/services/clients.service';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.scss'],
})
export class DeleteClientDialogComponent implements OnInit {
  client!: Client;
  errorMessage = '';
  constructor(
    public dialogRef: MatDialogRef<DeleteClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { client: Client },
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.client = this.data.client;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onDelete() {
    return this.clientsService.deleteClient(this.client.id).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/clients']);
      },
      error: () => {
        this.errorMessage = 'An error occurd!';
      },
    });
  }
}
