import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, map, tap, Observable } from 'rxjs';
import {
  GetUsersResponse,
  PostUser,
  PostUserResponse,
  User,
  UserLoginData,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(userData: UserLoginData): Observable<User[]> {
    return this.http.get<GetUsersResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArr) =>
        userArr.filter(
          (user) =>
            user.username === userData.username &&
            user.password === userData.password,
        ),
      ),
      map((userArr) =>
        userArr.map((user) => new User(user.email, user.username)),
      ),
      tap((userArr) => this.handleAuthentication(userArr)),
    );
  }

  register(userData: PostUser): Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(`${this.apiUrl}/users`, userData);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.user.getValue();
  }

  autoLogin() {
    const userData: { email: string; username: string } = JSON.parse(
      localStorage.getItem('user') as string,
    );
    if (!userData) {
      return;
    }
    const user = new User(userData.email, userData.username);
    this.user.next(user);
  }

  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) return;

    const user = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/clients']);
  }
}
