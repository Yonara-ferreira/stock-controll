import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SignupUserRequest } from 'src/app/models/interfaces/users/SingupUserRequest';
import { SingupUserResponse } from 'src/app/models/interfaces/users/SingupUserResponse';
import { authRequest } from 'src/app/models/interfaces/users/auth/authRequest';
import { authResponse } from 'src/app/models/interfaces/users/auth/authResponse';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root', // significa dizer que podemos usar um serviço
  // dentro de uma classe.
})
export class UsersService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private coockie: CookieService) {}

  singupUser(requestDatas: SignupUserRequest): Observable<SingupUserResponse> {
    return this.http.post<SingupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(requestDatas: authRequest): Observable<authResponse> {
    return this.http.post<authResponse>(`${this.API_URL}/auth`, requestDatas);
  }

  isLoggeIn(): boolean {
    // verifica se o usuario possui um token ou cookie
    const JWT_TOKEN = this.coockie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
