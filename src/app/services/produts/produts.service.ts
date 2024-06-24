import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProdutsService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProduts(): Observable<Array<GetAllProdutsResponse>> {
    return this.http
      .get<Array<GetAllProdutsResponse>>(
        `${this.API_URL}/produts`,
        this.httpOptions
      ) // vai me retornar no filtro apenas o que for maior que 0
      .pipe(map((produts) => produts.filter((data) => data.amount > 0)));
  }
}
