import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterAPIService {

  constructor(private _HttpClient: HttpClient) { }

  Register(data: object): Observable<any> {

    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', data);
  }
}
