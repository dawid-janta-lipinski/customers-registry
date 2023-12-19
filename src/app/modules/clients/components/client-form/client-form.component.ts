import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, PostClientForm } from 'app/modules/core/models/client.model';
import { ClientsService } from 'app/modules/core/services/clients.service';
import { FormsService } from 'app/modules/core/services/forms.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';
  succesfullyAddedClient = false;
  @Input() editMode = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      this.errorMessage = '';
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.succesfullyAddedClient = true;
      this.router.navigate(['clients']);
    },
    error: () => {
      this.errorMessage = 'Error occurd';
    },
    complete: () => {},
  };

  constructor(
    private clientService: ClientsService,
    private formsService: FormsService,
    private router: Router,
  ) {}

  get controls() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm() {
    this.clientForm = new FormGroup<PostClientForm>({
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      surname: new FormControl(this.editMode ? this.client.surname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(this.editMode ? this.client.phone : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  onAddClient() {
    if (this.editMode) {
      this.clientService
        .putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }
    this.clientService
      .postClient(this.clientForm.getRawValue())
      .subscribe(this.observer);
  }
  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
