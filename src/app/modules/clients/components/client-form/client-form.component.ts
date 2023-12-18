import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostClientForm } from 'app/modules/core/models/client.model';
import { ClientsService } from 'app/modules/core/services/clients.service';
import { FormsService } from 'app/modules/core/services/forms.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';
  succesfullyAddedClient = false;

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
      firstname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      surname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  onAddClient() {
    this.clientService.postClient(this.clientForm.getRawValue()).subscribe({
      next: () => {
        this.succesfullyAddedClient = true;
        this.errorMessage = 'Succesfully added new client!';
        setTimeout(() => {
          this.router.navigate(['clients']);
        }, 3000); // Delay navigation by 3 seconds
      },
      error: () => {
        this.errorMessage = 'Error occurd';
      },
    });
  }
}
