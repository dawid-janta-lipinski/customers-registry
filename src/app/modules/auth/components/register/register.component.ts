import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from 'app/modules/core/models/user.model';
import { AuthService } from 'app/modules/core/services/auth.service';
import { FormsService } from 'app/modules/core/services/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage = '';
  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.required,
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.required,
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.required,
      ],
      nonNullable: true,
    }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formsSerivce: FormsService,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) =>
    //   console.log(text),
    // );
    console.log('');
    // this.registerForm.controls.email.disable();
  }

  getErrorMessage(control: FormControl) {
    return this.formsSerivce.getErrorMessage(control);
  }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Error occurd';
      },
    });
    //console.log(this.registerForm.getRawValue());
  }
}
