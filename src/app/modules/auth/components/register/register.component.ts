import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from 'app/modules/core/models/user.model';
import { AuthService } from 'app/modules/core/services/auth.service';

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
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('minLength')) {
      return 'This field should have min 5 characters';
    }
    if (control.hasError('maxLength')) {
      return 'This field should have max 50 characters';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
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
    console.log(this.registerForm.getRawValue());
  }
}
