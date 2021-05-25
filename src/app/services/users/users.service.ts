import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  loadUsers(limit: number, page: number): Observable<any> {
    return this.http.get(
      `https://dummyapi.io/data/api/user?limit=${limit}&page=${page}`,
      { headers: { 'app-id': '60a970426f55c5f5453bfd05' } }
    );
  }
}
