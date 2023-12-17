import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, map } from 'rxjs';
import { Client, ClientResponse, postClient } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http
      .get<ClientResponse[]>(`${this.apiUrl}/clients`)
      .pipe(
        map((clients) =>
          clients.map(
            ({ id, firstname, surname, email, phone, address, postcode }) =>
              new Client(
                id,
                firstname,
                surname,
                email,
                phone,
                address,
                postcode,
              ),
          ),
        ),
      );
  }

  postClient(client: postClient): Observable<Client> {
    return this.http
      .post<ClientResponse>(`${this.apiUrl}/clients`, client)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }
}
