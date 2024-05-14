import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { SignupUserRequest } from 'src/app/models/interfaces/users/SingupUserRequest';
import { Observable } from 'rxjs';
import { SingupUserResponse } from 'src/app/models/interfaces/users/SingupUserResponse';
import { authRequest } from 'src/app/models/interfaces/users/auth/authRequest';
import { authResponse } from 'src/app/models/interfaces/users/auth/authResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root' // significa dizer que podemos usar um serviço
                         // dentro de uma classe.
})
export class UsersService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  singupUser(requestDatas: SignupUserRequest): Observable<SingupUserResponse>{
      return this.http.post<SingupUserResponse>(
        `${this.API_URL}/user`,requestDatas
      );
  }

  authUser(requestDatas: authRequest): Observable<authResponse>{
    return this.http.post<authResponse>(
      `${this.API_URL}/auth`, requestDatas
    );
  }
}
