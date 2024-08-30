import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { GetAllProdutsResponse } from 'src/app/models/interfaces/products/response/GetAllProdutsResponse';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProdutsService {
  private API_URL = environment.API_URL;

  //  definiçao de cookie definido
  private JWT_TOKEN = this.cookie.get('USER_INFO');

  // rotas privadas, necessario estar logado na aplicaçao
  // passando esse obj ...

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProducts(): Observable<Array<GetAllProdutsResponse>> {
    return this.http
      .get<Array<GetAllProdutsResponse>>(
        `${this.API_URL}/products`,
        this.httpOptions
      )
      .pipe(map((product) => product.filter((data) => data?.amount > 0)));
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/product/delete`,
      {
        ...this.httpOptions, params: {
          product_id: product_id,
        },
      }
    )

  }
}
