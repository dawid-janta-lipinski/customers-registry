import { Component } from '@angular/core';
import { UserLoginData } from 'app/modules/core/models/user.model';
import { AuthService } from 'app/modules/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  userData: UserLoginData = {
    username: '',
    password: '',
  };
  errorMessage = '';
  constructor(private authService: AuthService) {}
  onLogin() {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        console.log(value);
        if (value.length === 0) {
          this.errorMessage = 'This user does not exist';
        }
      },
      error: () => {
        this.errorMessage = 'Error occurd';
      },
    });
  }
}
