import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private api = 'https://localhost:5001/api/person';

  constructor(private httpClient: HttpClient) { }

  getall(): Observable<Person[]> {
    return <Observable<Person[]>>this.httpClient.get(this.api);
  }

  get(id: number): Observable<Person> {
    return <Observable<Person>>this.httpClient.get(`${this.api}/${id}`);
  }

  create(item: Person) {
    return this.httpClient.post(this.api, item);
  }

  editPerson(id: number, item: Person) {
    return <Observable<Person>>this.httpClient.put(`${this.api}/${id}`, item);
  }

  deletePerson(id: number): Observable<Person> {
    return <Observable<Person>>this.httpClient.delete(`${this.api}/${id}`);
  }
}
